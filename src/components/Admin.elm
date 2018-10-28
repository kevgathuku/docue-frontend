module Admin exposing (Flags, Model, Msg(..), Stats, decodeStats, emptyStats, getStatsCount, getWithToken, init, intialModel, main, subscriptions, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Http exposing (..)
import HttpBuilder exposing (..)
import HttpUtils exposing (httpErrorToString)
import Json.Decode as Decode exposing (field, int, map3)


type alias Model =
    { token : String
    , baseURL : String
    , countStats : Stats
    , countStatsError : String
    }


type alias Stats =
    { docsCount : Int
    , usersCount : Int
    , rolesCount : Int
    }


type Msg
    = FetchCountStats
    | HandleCountStats (Result Http.Error Stats)


type alias Flags =
    { token : String
    , baseURL : String
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


getStatsCount : String -> String -> Cmd Msg
getStatsCount token baseURL =
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


intialModel : Model
intialModel =
    { token = ""
    , countStats = emptyStats
    , countStatsError = ""
    , baseURL = ""
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { intialModel | token = flags.token, baseURL = flags.baseURL }
    , getStatsCount flags.token flags.baseURL
    )


main : Program Flags Model Msg
main =
    Browser.element { init = init, view = view, update = update, subscriptions = subscriptions }


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ div [ class "card-panel" ]
            [ h2 [ class "header center-align" ] [ text "Admin Panel" ]
            , div [ class "row" ]
                [ div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Users" ]
                    , p [ id "users-count", class "flow-text" ] [ text (String.fromInt model.countStats.usersCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/admin/users" ]
                        [ i [ class "material-icons left" ] [ text "face" ]
                        , text "Manage Users"
                        ]
                    ]
                , div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Documents" ]
                    , p [ id "docs-count", class "flow-text" ] [ text (String.fromInt model.countStats.docsCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/dashboard" ]
                        [ i [ class "material-icons left" ] [ text "drafts" ]
                        , text "Manage Docs"
                        ]
                    ]
                , div [ class "col s4 center-align" ]
                    [ h5 [] [ text "Total Roles" ]
                    , p [ id "roles-count", class "flow-text" ] [ text (String.fromInt model.countStats.rolesCount) ]
                    , a [ class "waves-effect waves-light btn blue", href "/admin/roles" ]
                        [ i [ class "material-icons left" ] [ text "settings" ]
                        , text "Manage Roles"
                        ]
                    ]
                ]
            ]
        ]
