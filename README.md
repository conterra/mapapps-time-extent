⚠️ This bundle is no longer in active development.
# Time Extent Bundle
The Time Extent bundle allows users to filter FeatureLayer for a specific time extent.

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_timeextent/index.html

## Installation Guide
**Requirement: map.apps 4.12.0**

1. First, you need to add the bundle "dn_timeextent" to your app.
2. After that, add a time-aware FeatureLayer to your app.
3. Finally you can configure your time extent bundle.

### Configurable Components of dn_timesextent:
#### Config:
```
"dn_timesextent": {
    "Config": {
        "start": "2000-08-01T00:00Z",
        "end": "2000-10-04T00:00Z"
    }
}
```

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
