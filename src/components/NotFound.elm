module NotFound exposing (main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)


type alias Model =
    String


initialModel : Model
initialModel =
    "Not Found"


main =
    Browser.sandbox { init = initialModel, view = view, update = update }


update msg model =
    model


view model =
    div [ class "container" ]
        [ div [ class "card-panel" ]
            [ div [ class "row" ]
                [ h2 [ class "header center-align" ] [ text model ]
                ]
            , div [ class "row" ]
                [ p [ class "flow-text center-align" ] [ text "Sorry. This is not the page you were looking for" ]
                ]
            ]
        ]
