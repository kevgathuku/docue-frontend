module AdminTest exposing (modelWithDocs, modelWithRoles, modelWithUsers, rendering, statsDisplay, suite)

import Admin
import Expect
import Test exposing (..)
import Test.Html.Query as Query
import Test.Html.Selector exposing (attribute, class, classes, id, tag, text)


suite : Test
suite =
    describe "Admin" [ rendering, statsDisplay ]


rendering : Test
rendering =
    describe "Rendering"
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
                    |> Query.findAll [ classes (String.split " " "col s4 center-align") ]
                    |> Query.count (Expect.equal 3)
        , test "Displays the Users section with the correct content" <|
            \() ->
                Admin.view Admin.intialModel
                    |> Query.fromHtml
                    |> Query.findAll [ classes (String.split " " "col s4 center-align") ]
                    |> Query.first
                    |> Query.has [ text "Total Users" ]
        , test "Displays the Documents section with the correct content" <|
            \() ->
                Admin.view Admin.intialModel
                    |> Query.fromHtml
                    |> Query.findAll [ classes (String.split " " "col s4 center-align") ]
                    |> Query.index 1
                    |> Query.has [ text "Total Documents" ]
        , test "Displays the Roles section with the correct content" <|
            \() ->
                Admin.view Admin.intialModel
                    |> Query.fromHtml
                    |> Query.findAll [ classes (String.split " " "col s4 center-align") ]
                    |> Query.index 2
                    |> Query.has [ text "Total Roles" ]
        , test "Displays all Buttons" <|
            \() ->
                Admin.view Admin.intialModel
                    |> Query.fromHtml
                    |> Query.findAll [ classes [ "btn", "blue" ] ]
                    |> Query.count (Expect.equal 3)
        ]


modelWithUsers : Int -> Admin.Model -> Admin.Model
modelWithUsers usersCount intialModel =
    { intialModel
        | countStats =
            { docsCount = 0
            , usersCount = usersCount
            , rolesCount = 0
            }
    }


modelWithDocs : Int -> Admin.Model -> Admin.Model
modelWithDocs docsCount intialModel =
    { intialModel
        | countStats =
            { docsCount = docsCount
            , usersCount = 0
            , rolesCount = 0
            }
    }


modelWithRoles : Int -> Admin.Model -> Admin.Model
modelWithRoles rolesCount intialModel =
    { intialModel
        | countStats =
            { docsCount = 0
            , usersCount = 0
            , rolesCount = rolesCount
            }
    }


statsDisplay : Test
statsDisplay =
    describe "Stats Display"
        [ describe "Users count"
            [ test "Shows correct initial count" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.find [ id "users-count" ]
                        |> Query.has [ text "0" ]
            , test "Shows correct user count after data is updated" <|
                \() ->
                    Admin.view (modelWithUsers 1 Admin.intialModel)
                        |> Query.fromHtml
                        |> Query.find [ id "users-count" ]
                        |> Query.has [ text "1" ]
            ]
        , describe "Roles Count"
            [ test "Shows correct initial count" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.find [ id "roles-count" ]
                        |> Query.has [ text "0" ]
            , test "Shows correct roles count after data is updated" <|
                \() ->
                    Admin.view (modelWithRoles 1 Admin.intialModel)
                        |> Query.fromHtml
                        |> Query.find [ id "roles-count" ]
                        |> Query.has [ text "1" ]
            ]
        , describe "Docs Count"
            [ test "Shows correct initial count" <|
                \() ->
                    Admin.view Admin.intialModel
                        |> Query.fromHtml
                        |> Query.find [ id "docs-count" ]
                        |> Query.has [ text "0" ]
            , test "Shows correct docs count after data is updated" <|
                \() ->
                    Admin.view (modelWithDocs 1 Admin.intialModel)
                        |> Query.fromHtml
                        |> Query.find [ id "docs-count" ]
                        |> Query.has [ text "1" ]
            ]
        ]
