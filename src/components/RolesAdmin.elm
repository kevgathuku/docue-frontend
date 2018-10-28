port module RolesAdmin exposing (Flags, Model, Msg(..), Role, decodeRoles, fetchRoles, getWithToken, init, intialModel, main, renderRole, roleDecoder, subscriptions, tooltips, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onMouseEnter)
import Http exposing (..)
import HttpBuilder exposing (..)
import HttpUtils exposing (httpErrorToString)
import Json.Decode as Decode exposing (field, int, map3, string)


type alias Model =
    { token : String
    , baseURL : String
    , roles : List Role
    , rolesFetchError : String
    }


type alias Role =
    { id_ : String
    , title : String
    , accessLevel : Int
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


getWithToken : String -> String -> Request (List Role)
getWithToken url token =
    HttpBuilder.get url
        |> withHeader "x-access-token" token
        |> withExpect (Http.expectJson decodeRoles)
        |> toRequest


fetchRoles : String -> String -> Cmd Msg
fetchRoles token baseURL =
    let
        url =
            baseURL ++ "/api/roles"

        request =
            getWithToken url token
    in
    Http.send HandleRolesResult request


roleDecoder : Decode.Decoder Role
roleDecoder =
    Decode.map3 Role
        (field "_id" string)
        (field "title" string)
        (field "accessLevel" int)


decodeRoles : Decode.Decoder (List Role)
decodeRoles =
    Decode.list roleDecoder


type Msg
    = ActivateTooltip
    | FetchRoles
    | HandleRolesResult (Result Http.Error (List Role))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ActivateTooltip ->
            ( model, tooltips () )

        FetchRoles ->
            ( model, Cmd.none )

        HandleRolesResult (Ok roles) ->
            ( { model | roles = roles }, Cmd.none )

        HandleRolesResult (Err error) ->
            ( { model | rolesFetchError = httpErrorToString error }, Cmd.none )


intialModel : Model
intialModel =
    { token = ""
    , baseURL = ""
    , roles = []
    , rolesFetchError = ""
    }


type alias Flags =
    { token : String
    , baseURL : String
    }


port tooltips : () -> Cmd msg


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { intialModel | token = flags.token, baseURL = flags.baseURL }
    , fetchRoles flags.token flags.baseURL
    )


main : Program Flags Model Msg
main =
    Browser.element { init = init, view = view, update = update, subscriptions = subscriptions }


renderRole : Role -> Html Msg
renderRole role =
    tr []
        [ td [] [ text role.title ]
        , td [] [ text (String.fromInt role.accessLevel) ]
        ]


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ div [ class "card-panel" ]
            [ h2 [ class "header center-align" ] [ text "Manage Roles" ]
            , div [ class "row" ]
                [ div [ class "col s10 offset-s1 center-align" ]
                    [ table [ class "centered" ]
                        [ thead []
                            [ tr []
                                [ th [ attribute "data-field" "id" ] [ text "Role" ]
                                , th [ attribute "data-field" "name" ] [ text "Access Level" ]
                                ]
                            ]
                        , tbody [] (List.map renderRole model.roles)
                        ]
                    ]
                ]
            , div
                [ class "fixed-action-btn"
                , style "bottom" "45px"
                , style "right" "24px"
                , onMouseEnter ActivateTooltip
                ]
                [ a
                    [ class "btn-floating btn-large tooltipped pink"
                    , attribute "data-delay" "50"
                    , attribute "data-position" "left"
                    , attribute "data-tooltip" "Create Role"
                    , href "/admin/roles/create"
                    ]
                    [ i [ class "material-icons" ] [ text "edit" ]
                    ]
                ]
            ]
        ]
