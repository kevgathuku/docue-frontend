port module Login exposing (Model, Msg(..), handleSubmit, initialModel, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit)


type alias Model =
    { email : String
    , password : String
    }


type Msg
    = Submit
    | EmailChange String
    | PasswordChange String



-- port for sending strings out to JavaScript


port handleSubmit : Model -> Cmd msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Submit ->
            ( model, handleSubmit model )

        EmailChange value ->
            ( { model | email = value }, Cmd.none )

        PasswordChange value ->
            ( { model | password = value }, Cmd.none )


view : Model -> Html Msg
view model =
    div [ class "row" ]
        [ Html.form [ class "col s12", onSubmit Submit ]
            [ div [ class "input-field col s12" ]
                [ input [ class "validate", name "email", value model.email, onInput EmailChange, required True, type_ "text" ] []
                , label [ for "email" ] [ text "Email Address" ]
                ]
            , div [ class "input-field col s12" ]
                [ input [ class "validate", name "password", value model.password, onInput PasswordChange, required True, type_ "password" ] []
                , label [ for "password" ] [ text "Password" ]
                ]
            , div [ class "col s12" ]
                [ div [ class "container center" ]
                    [ button [ class "btn waves-effect header-btn blue", name "action", type_ "submit" ] [ text "Login" ]
                    ]
                ]
            ]
        ]


initialModel : Model
initialModel =
    { email = "", password = "" }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initialModel, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main =
    Browser.element { init = init, view = view, update = update, subscriptions = subscriptions }
