port module CreateRole exposing (Flags, Model, Msg(..), handleSubmit, init, main, model, subscriptions, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onSubmit)


type alias Model =
    { token : String
    , title : String
    }


model : Model
model =
    { token = ""
    , title = ""
    }



-- port for sending strings out to JavaScript


port handleSubmit : String -> Cmd msg


type Msg
    = Submit
    | TitleChange String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg state =
    case msg of
        Submit ->
            ( state, handleSubmit state.title )

        TitleChange value ->
            ( { state | title = value }, Cmd.none )


type alias Flags =
    { token : String
    }


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.token "", Cmd.none )


main =
    Browser.element { init = init, view = view, update = update, subscriptions = subscriptions }


view : Model -> Html Msg
view state =
    div [ class "container" ]
        [ div [ class "row" ]
            [ h2 [ class "header center-align" ]
                [ text "Create Role" ]
            ]
        , div [ class "row" ]
            [ Html.form [ class "col s12", onSubmit Submit ]
                [ div [ class "input-field col s4 offset-s2" ]
                    [ input [ class "validate", id "title", name "title", type_ "text", value state.title, onInput TitleChange ] []
                    , label [ class "active", for "title" ] [ text "Title" ]
                    ]
                , div [ class "col s6" ]
                    [ button [ class "btn waves-effect header-btn blue", name "action", type_ "submit", style "top" "25px", style "position" "relative" ] [ text "submit", i [ class "material-icons right" ] [ text "send" ] ]
                    ]
                ]
            ]
        ]
