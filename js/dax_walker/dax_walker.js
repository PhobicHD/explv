'use strict';

import { Position } from '../model/Position.js';

const API_URL = "https://insomnia247.nl:5079/v1/get_path";

const errorMessageMapping = {
    "UNMAPPED_REGION": "Unmapped region",
    "BLOCKED": "Tile is blocked",
    "EXCEEDED_SEARCH_LIMIT": "Exceeded search limit",
    "UNREACHABLE": "Unreachable tile",
    "NO_WEB_PATH" : "No web path",
    "INVALID_CREDENTIALS": "Invalid credentials",
    "RATE_LIMIT_EXCEEDED": "Rate limit exceeded",
    "NO_RESPONSE_FROM_SERVER": "No response from server",
    "UNKNOWN": "Unknown"
};

export function getPath({start, end, onSuccess, onError}) {
    var start_time = new Date().getTime();
    $.ajax({
        url: API_URL,
        type: 'POST',
        data: JSON.stringify({
                "x_start": start.x,
                "y_start": start.y,
                "p_start": start.z,
                "x_end": end.x,
                "y_end": end.y,
                "p_end": end.z
        }),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
	    console.log("Path queried in: " + (new Date().getTime() - start_time));
            if (data['path'].length == 0) {
                onError(start, end, "Path Generation Failed");
            } else {
                const path = data['path'];
                const pathPositions = path.map(pos => new Position(pos.x, pos.y, pos.p));
                onSuccess(pathPositions);
            }
        }
    });
}
