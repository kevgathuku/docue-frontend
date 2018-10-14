module LandingTest exposing (suite)

import Landing
import Test exposing (..)
import Test.Html.Query as Query
import Test.Html.Selector exposing (attribute, text)


suite : Test
suite =
    describe "Landing"
        [ test "Correctly Renders Model Content" <|
            \() ->
                Landing.view { authLink = "/authenticate" }
                    |> Query.fromHtml
                    |> Query.find [ attribute "href" "/authenticate" ]
                    |> Query.has [ text "Get Started" ]
        ]
