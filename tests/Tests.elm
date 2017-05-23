module Tests exposing (..)

import Test exposing (..)
import Expect
import NotFound
import Html
import Html.Attributes exposing (class)
import Test.Html.Query as Query
import Test.Html.Selector exposing (text, tag)


all : Test
all =
    describe "Sample Test Suite"
        [ describe "Not Found"
            [ test "Correctly Renders Model Content" <|
                \() ->
                    NotFound.view "Nothing"
                        |> Query.fromHtml
                        |> Query.find [ tag "h2" ]
                        |> Query.has [ text "Nothing" ]
            , test "Renders static text" <|
                \() ->
                    NotFound.view "Nothing"
                        |> Query.fromHtml
                        |> Query.find [ tag "p" ]
                        |> Query.has [ text "Sorry. This is not the page you were looking for" ]
            ]
        ]
