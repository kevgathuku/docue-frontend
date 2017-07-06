module NotFoundTest exposing (..)

import Test exposing (..)
import Test.Html.Query as Query
import Test.Html.Selector exposing (attribute, text, tag)
import NotFound


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
