module Admin exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Http exposing (..)
import Json.Decode as Decode exposing (int, field, map3)
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


type alias Stats =
    { docsCount : Int
    , usersCount : Int
    , rolesCount : Int
    }


type alias Model =
    { token : String
    , countStats : Stats
    , countStatsError : String
    }


type Msg
    = FetchCountStats
    | HandleCountStats (Result Http.Error Stats)


type alias Flags =
    { token : String
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


getWithToken : String -> String -> Request Stats
getWithToken url token =
    HttpBuilder.get url
        |> withHeader "x-access-token" token
        |> withExpect (Http.expectJson decodeStats)
        |> toRequest


getStatsCount : String -> Cmd Msg
getStatsCount token =
    let
        url =
            baseURL ++ "/api/stats"

        request =
            getWithToken url token
    in
        Http.send HandleCountStats request


decodeStats : Decode.Decoder Stats
decodeStats =
    Decode.map3 Stats
        (field "documents" int)
        (field "users" int)
        (field "roles" int)


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
        FetchCountStats ->
            ( model, Cmd.none )

        HandleCountStats (Ok stats) ->
            ( { model | countStats = stats }, Cmd.none )

        HandleCountStats (Err error) ->
            ( { model | countStatsError = httpErrorToString error }, Cmd.none )


emptyStats : Stats
emptyStats =
    { docsCount = 0
    , usersCount = 0
    , rolesCount = 0
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { token = flags.token
      , countStats = emptyStats
      , countStatsError = ""
      }
    , getStatsCount flags.token
    )


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
                    , p [ id "users-count", class "flow-text" ] [ text (toString model.countStats.usersCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/admin/users" ]
                        [ i [ class "material-icons left" ] [ text "face" ]
                        , text "Manage Users"
                        ]
                    ]
                , div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Documents" ]
                    , p [ id "docs-count", class "flow-text" ] [ text (toString model.countStats.docsCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/dashboard" ]
                        [ i [ class "material-icons left" ] [ text "drafts" ]
                        , text "Manage Documents"
                        ]
                    ]
                , div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Roles" ]
                    , p [ id "roles-count", class "flow-text" ] [ text (toString model.countStats.rolesCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/admin/roles" ]
                        [ i [ class "material-icons left" ] [ text "settings" ]
                        , text "Manage Roles"
                        ]
                    ]
                ]
            ]
        ]
