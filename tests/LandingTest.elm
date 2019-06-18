module LandingTest exposing (suite)

import Html.Attributes as Attr
import Landing
import Test exposing (..)
import Test.Html.Query as Query
import Test.Html.Selector exposing (attribute, tag, text)


suite : Test
suite =
    describe "Landing"
        [ test "Correctly Renders Model Content" <|
            \() ->
                Landing.view { authLink = "/authenticate" }
                    |> Query.fromHtml
                    |> Query.find [ tag "a" ]
                    |> Query.has [ text "Get Started" ]
        ]
