module AdminTest exposing (..)

import Test exposing (..)
import Test.Html.Query as Query
import Test.Html.Selector exposing (attribute, text, tag, class, className)
import Admin
import Expect


suite : Test
suite =
    describe "Admin"
        [ describe "Rendering"
            [ test "Correctly Renders Model Content" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.find [ class "header" ]
                        |> Query.has [ text "Admin Panel" ]
            , test "Displays all Sections" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.findAll [ className "col s4 center-align" ]
                        |> Query.count (Expect.equal 3)
            , test "Displays the Users section with the correct content" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.findAll [ className "col s4 center-align" ]
                        |> Query.first
                        |> Query.has [ text "Total Users" ]
            , test "Displays the Documents section with the correct content" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.findAll [ className "col s4 center-align" ]
                        |> Query.index 1
                        |> Query.has [ text "Total Documents" ]
            , test "Displays the Roles section with the correct content" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.findAll [ className "col s4 center-align" ]
                        |> Query.index 2
                        |> Query.has [ text "Total Roles" ]
            ]
        ]
