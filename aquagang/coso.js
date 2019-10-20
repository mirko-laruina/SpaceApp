import SyncTileSet from 'node-hgt';

var tileset = new SyncTileSet('./data/', [43, 10], [44, 12], function(err) {
        if (err) {
            console.log(err);
            return;
        }

        // All tiles are loaded (or downloaded, if they were not already on disk)
        // and queries can be made synchronous.

        var elevation = tileset.getElevation([43.6, 10.5]);
        console.log(elevation);
    });
