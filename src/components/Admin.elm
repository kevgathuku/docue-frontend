port module Admin exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Http exposing (..)
import Json.Decode as Decode
import HttpBuilder exposing (..)


-- let BASE_URL;
-- if (process.env.NODE_ENV === 'development') {
--   console.log('Running in DEV');
--   BASE_URL = 'http://localhost:8000';
-- } else {
--   BASE_URL = 'https://docue.herokuapp.com';
-- }


baseURL : String
baseURL =
    "http://localhost:8000"


type alias Model =
    { token : String
    , docsCount : Int
    , usersCount : Int
    , usersError : String
    , rolesCount : Int
    }


type Msg
    = FetchUsers
    | FetchRoles
    | FetchDocs
    | HandleUsers (Result Http.Error Int)


type alias Flags =
    { token : String
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


getWithToken : String -> String -> Request Int
getWithToken url token =
    HttpBuilder.get url
        |> withHeader "x-access-token" token
        |> withExpect (Http.expectJson decodeUsers)
        |> toRequest


getUsersCount : String -> Cmd Msg
getUsersCount token =
    let
        url =
            baseURL ++ "/api/users/stats"

        request =
            getWithToken url token
    in
        Http.send HandleUsers request


decodeUsers : Decode.Decoder Int
decodeUsers =
    Decode.at [ "count" ] Decode.int


httpErrorToString : Http.Error -> String
httpErrorToString error =
    case error of
        BadUrl text ->
            "Bad Url: " ++ text

        Timeout ->
            "Http Timeout"

        NetworkError ->
            "Network Error"

        BadStatus response ->
            "Bad Http Status: " ++ toString response.status.code

        BadPayload message response ->
            "Bad Http Payload: "
                ++ toString message
                ++ " ("
                ++ toString response.status.code
                ++ ")"


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FetchUsers ->
            ( model, Cmd.none )

        HandleUsers (Ok numUsers) ->
            ( { model | usersCount = numUsers }, Cmd.none )

        HandleUsers (Err error) ->
            ( { model | usersError = httpErrorToString error }, Cmd.none )

        FetchRoles ->
            ( model, Cmd.none )

        FetchDocs ->
            ( model, Cmd.none )


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { token = flags.token, docsCount = 0, usersCount = 0, rolesCount = 0, usersError = "" }, getUsersCount flags.token )


main : Program Flags Model Msg
main =
    programWithFlags { init = init, view = view, update = update, subscriptions = subscriptions }


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ div [ class "card-panel" ]
            [ h2 [ class "header center-align" ] [ text "Admin Panel" ]
            , div [ class "row" ]
                [ div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Users" ]
                    , p [ id "users-count", class "flow-text" ] [ text (toString model.usersCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/admin/users" ]
                        [ i [ class "material-icons left" ] [ text "face" ]
                        , text "Manage Users"
                        ]
                    ]
                , div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Documents" ]
                    , p [ id "docs-count", class "flow-text" ] [ text (toString model.docsCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/dashboard" ]
                        [ i [ class "material-icons left" ] [ text "drafts" ]
                        , text "Manage Documents"
                        ]
                    ]
                , div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Roles" ]
                    , p [ id "roles-count", class "flow-text" ] [ text (toString model.rolesCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/admin/roles" ]
                        [ i [ class "material-icons left" ] [ text "settings" ]
                        , text "Manage Roles"
                        ]
                    ]
                ]
            ]
        ]
