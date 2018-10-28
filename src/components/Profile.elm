port module Profile exposing (Flags, Model, Msg(..), PasswordState(..), User, comparePassword, decodeUserUpdateResponse, editForm, init, main, materializeToast, onClickNoDefault, profileView, putWithToken, subscriptions, update, updateCachedUserInfo, updateUserDetails, userBody, userBodyWithPassword, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput, preventDefaultOn)
import Http exposing (..)
import HttpBuilder exposing (..)
import HttpUtils exposing (httpErrorToString)
import Json.Decode as Decode
import Json.Encode as Encode


type alias Model =
    { token : String
    , baseURL : String
    , password : String
    , passwordConfirm : String
    , profileDisplay : String
    , editDisplay : String
    , user : User
    , userUpdateError : String
    }


type alias User =
    { id_ : String
    , email : String
    , firstName : String
    , lastName : String
    , role : String
    }


type Msg
    = EmailChange String
    | FirstNameChange String
    | LastNameChange String
    | PasswordChange String
    | PasswordConfirmChange String
    | HandleSubmit
    | ToggleEdit
    | HandleUpdateResponse (Result Http.Error User)


type alias Flags =
    { token : String
    , baseURL : String
    , user : User
    }


type PasswordState
    = Match
    | Invalid
    | Empty


port materializeToast : ( String, Int, String ) -> Cmd msg


port updateCachedUserInfo : User -> Cmd msg


comparePassword : String -> String -> ( PasswordState, Cmd msg )
comparePassword password confirmPassword =
    if password == "" && confirmPassword == "" then
        ( Empty, Cmd.none )

    else if password /= confirmPassword then
        ( Invalid, materializeToast ( "Passwords don't match", 2000, "error-toast" ) )

    else if String.length password <= 6 then
        ( Invalid, materializeToast ( "Passwords should be > 6 characters ", 2000, "error-toast" ) )

    else
        ( Match, Cmd.none )


decodeUserUpdateResponse : Decode.Decoder User
decodeUserUpdateResponse =
    Decode.map5 User
        (Decode.field "_id" Decode.string)
        (Decode.field "email" Decode.string)
        (Decode.at [ "name", "first" ] Decode.string)
        (Decode.at [ "name", "last" ] Decode.string)
        (Decode.at [ "role", "title" ] Decode.string)


userBody : Model -> Encode.Value
userBody model =
    Encode.object
        [ ( "firstname", Encode.string model.user.firstName )
        , ( "lastname", Encode.string model.user.lastName )
        , ( "email", Encode.string model.user.email )
        ]


userBodyWithPassword : Model -> Encode.Value
userBodyWithPassword model =
    Encode.object
        [ ( "firstname", Encode.string model.user.firstName )
        , ( "lastname", Encode.string model.user.lastName )
        , ( "email", Encode.string model.user.email )
        , ( "password", Encode.string model.password )
        ]


putWithToken : String -> String -> Encode.Value -> Request User
putWithToken url token body =
    HttpBuilder.put url
        |> withHeader "x-access-token" token
        |> withExpect (Http.expectJson decodeUserUpdateResponse)
        |> withJsonBody body
        |> toRequest


updateUserDetails : String -> String -> String -> Encode.Value -> Cmd Msg
updateUserDetails token baseURL userId body =
    let
        url =
            baseURL ++ "/api/users/" ++ userId

        request =
            putWithToken url token body
    in
    Http.send HandleUpdateResponse request


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleEdit ->
            ( if model.editDisplay == "none" then
                { model | editDisplay = "block", profileDisplay = "none" }

              else
                { model | editDisplay = "none", profileDisplay = "block" }
            , Cmd.none
            )

        EmailChange updatedEmail ->
            let
                oldUser =
                    model.user

                newUser =
                    { oldUser | email = updatedEmail }
            in
            ( { model | user = newUser }
            , Cmd.none
            )

        FirstNameChange updatedFirstName ->
            let
                oldUser =
                    model.user

                newUser =
                    { oldUser | firstName = updatedFirstName }
            in
            ( { model | user = newUser }
            , Cmd.none
            )

        LastNameChange updatedLastName ->
            let
                oldUser =
                    model.user

                newUser =
                    { oldUser | lastName = updatedLastName }
            in
            ( { model | user = newUser }
            , Cmd.none
            )

        PasswordChange updatedPassword ->
            ( { model | password = updatedPassword }
            , Cmd.none
            )

        PasswordConfirmChange updatedPasswordConfirmation ->
            ( { model | passwordConfirm = updatedPasswordConfirmation }
            , Cmd.none
            )

        HandleSubmit ->
            case comparePassword model.password model.passwordConfirm of
                -- Passwords empty, send userBody to backend
                ( Empty, _ ) ->
                    ( model, updateUserDetails model.token model.baseURL model.user.id_ (userBody model) )

                -- Passwords match, send userBodyWithPassword to backend
                ( Match, _ ) ->
                    ( model, updateUserDetails model.token model.baseURL model.user.id_ (userBodyWithPassword model) )

                -- if Invalid, execute Cmd, don't send anything
                ( Invalid, cmd ) ->
                    ( model, cmd )

        HandleUpdateResponse (Ok user) ->
            ( { model | user = user }, updateCachedUserInfo model.user )

        HandleUpdateResponse (Err error) ->
            ( { model | userUpdateError = httpErrorToString error }, Cmd.none )


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { token = flags.token
      , baseURL = flags.baseURL
      , profileDisplay = "block"
      , editDisplay = "none"
      , user = flags.user
      , password = ""
      , passwordConfirm = ""
      , userUpdateError = ""
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Program Flags Model Msg
main =
    Browser.element { init = init, view = view, update = update, subscriptions = subscriptions }


profileView : Model -> Html Msg
profileView model =
    div [ style "display" model.profileDisplay ]
        [ div [ class "row" ]
            [ h2 [ class "header center-align" ] [ text "My Profile" ]
            ]
        , div [ class "row" ]
            [ div [ class "col s8 offset-s2" ]
                [ div [ class "card" ]
                    [ div [ class "card-image waves-effect waves-block waves-light" ]
                        [ img [ class "activator", alt "Profile logo", src "mountain.jpg" ] []
                        , span [ class "card-title activator" ] [ text (model.user.firstName ++ " " ++ model.user.lastName) ]
                        ]
                    , div [ class "card-action" ]
                        [ a
                            [ class "btn-floating"
                            , attribute "data-position" "top"
                            , attribute "data-delay" "50"
                            , attribute "data-tooltip" "Edit Profile"
                            , onClick ToggleEdit
                            ]
                            [ i [ class "material-icons cyan lighten-1" ] [ text "edit" ]
                            ]
                        , span [ class "card-title activator grey-text text-darken-4" ]
                            [ i [ class "material-icons right icon-align" ] [ text "more_vert" ]
                            ]
                        ]
                    , div [ class "card-reveal" ]
                        [ span [ class "card-title grey-text text-darken-4 center" ]
                            [ text "Full Profile", i [ class "material-icons right" ] [ text "close" ] ]
                        , p [ class "flow-text" ]
                            [ i [ class "material-icons left icon-align" ] [ text "face" ]
                            , text ("Name: " ++ model.user.firstName ++ " " ++ model.user.lastName)
                            ]
                        , p [ class "flow-text" ]
                            [ i [ class "material-icons left icon-align" ] [ text "email" ]
                            , text ("Email: " ++ model.user.email)
                            ]
                        , p [ class "flow-text" ]
                            [ i [ class "material-icons left icon-align" ] [ text "settings" ]
                            , text ("Role: " ++ model.user.role)
                            ]
                        ]
                    ]
                ]
            ]
        ]


editForm : Model -> Html Msg
editForm model =
    div [ class "card-panel", style "display" model.editDisplay ]
        [ div [ class "row" ]
            [ h2 [ class "header center-align" ] [ text "Edit Profile" ]
            ]
        , Html.form [ class "col s10 offset-s1" ]
            [ div [ class "row" ]
                [ div [ class "col s4 offset-s4" ]
                    [ label [ for "email" ] [ text "Email" ]
                    , input [ id "email", name "email", type_ "text", value model.user.email, onInput EmailChange ] []
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col s4 offset-s4" ]
                    [ label [ for "firstname" ] [ text "First Name" ]
                    , input [ id "firstname", name "firstname", type_ "text", value model.user.firstName, onInput FirstNameChange ] []
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col s4 offset-s4" ]
                    [ label [ for "lastname" ] [ text "Last Name" ]
                    , input [ id "lastname", name "lastname", type_ "text", value model.user.lastName, onInput LastNameChange ] []
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col s4 offset-s4" ]
                    [ label [ for "password" ] [ text "New Password" ]
                    , input [ id "password", name "password", type_ "password", value model.password, onInput PasswordChange ] []
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col s4 offset-s4" ]
                    [ label [ for "confirm-password" ] [ text "New Password" ]
                    , input [ id "confirm-password", name "confirm-password", type_ "password", value model.passwordConfirm, onInput PasswordConfirmChange ] []
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col s2 offset-s4" ]
                    [ button [ class "btn waves-effect red accent-2 center", onClickNoDefault ToggleEdit ] [ text "cancel" ]
                    ]
                , div [ class "col s2" ]
                    [ button [ class "btn waves-effect blue center", onClickNoDefault HandleSubmit ] [ text "update" ]
                    ]
                ]
            ]
        ]


alwaysPreventDefault : msg -> ( msg, Bool )
alwaysPreventDefault msg =
    ( msg, True )


onClickNoDefault : msg -> Attribute msg
onClickNoDefault message =
    preventDefaultOn "click" (Decode.map alwaysPreventDefault (Decode.succeed message))


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ if model.editDisplay == "none" then
            profileView model

          else
            editForm model
        ]
