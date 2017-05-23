port module CreateRole exposing (..)

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
    | Title String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Submit ->
            ( model, handleSubmit model.title )

        Title value ->
            ( { model | title = value }, Cmd.none )


type alias Flags =
    { token : String
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.token "", Cmd.none )


main =
    programWithFlags { init = init, view = view, update = update, subscriptions = subscriptions }


buttonStyle : Attribute msg
buttonStyle =
    style
        [ ( "top", "25px" )
        , ( "position", "relative" )
        ]


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ div [ class "row" ]
            [ h2 [ class "header center-align" ]
                [ text "Create Role" ]
            ]
        , div [ class "row" ]
            [ Html.form [ class "col s12", onSubmit Submit ]
                [ div [ class "input-field col s4 offset-s2" ]
                    [ input [ class "validate", id "title", name "title", type_ "text", value model.title, onInput Title ] []
                    , label [ class "active", for "title" ] [ text "Title" ]
                    ]
                , div [ class "col s6" ]
                    [ button [ class "btn waves-effect header-btn blue", name "action", type_ "submit", buttonStyle ] [ text "submit", i [ class "material-icons right" ] [ text "send" ] ]
                    ]
                ]
            ]
        ]
