module Landing exposing (Model, initialModel, main, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)


type alias Model =
    { authLink : String
    }


initialModel : Model
initialModel =
    { authLink = "/auth" }


update msg model =
    model


main =
    Browser.sandbox { init = initialModel, view = view, update = update }


view : Model -> Html msg
view model =
    div [ id "hero" ]
        [ div [ class "container", id "hero-text-container" ]
            [ div [ class "row" ]
                [ div [ class "col s12 center-align" ]
                    [ h1 [ id "hero-title" ]
                        [ span [ class "bold" ] [ text "Docue    " ]
                        , span [ class "thin" ] [ text "is the simplest way for" ]
                        , br [] []
                        , span [ class "thin" ] [ text "you to manage your documents online" ]
                        ]
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col s12" ]
                    [ div [ class "center-align" ]
                        [ a [ class "btn btn-large create-list-link hero-btn", href model.authLink ] [ text "Get Started" ]
                        ]
                    ]
                ]
            ]
        ]
