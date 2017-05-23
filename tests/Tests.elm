module Tests exposing (..)

import Test exposing (..)
import Expect
import Test.Html.Query as Query
import Test.Html.Selector exposing (attribute, text, tag)
import Landing
import NotFound


all : Test
all =
    describe "Docue Test Suite"
        [ notFound, landing ]


notFound : Test
notFound =
    describe "Not Found"
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


landing : Test
landing =
    describe "Landing"
        [ test "Correctly Renders Model Content" <|
            \() ->
                Landing.view { authLink = "/authenticate" }
                    |> Query.fromHtml
                    |> Query.find [ attribute "href" "/authenticate" ]
                    |> Query.has [ text "Get Started" ]
        ]
