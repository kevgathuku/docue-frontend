module HttpUtils exposing (httpErrorToString)

import Http exposing (..)


httpErrorToString : Http.Error -> String
httpErrorToString error =
    case error of
        BadUrl text ->
            "Bad Url: " ++ text

        Timeout ->
            "Http Timeout"

        NetworkError ->
            "Network Error"

        BadStatus response ->
            "Bad Http Status: " ++ String.fromInt response.status.code

        BadPayload message response ->
            "Bad Http Payload: "
                ++ message
                ++ " ("
                ++ String.fromInt response.status.code
                ++ ")"
