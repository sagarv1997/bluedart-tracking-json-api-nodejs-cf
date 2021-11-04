# Bluedart Tracking JSON API Cloud Function

Bluedart Tracking Cloud Function is used to fetch details from Bluedart API and convert the XML format response to JSON.

The cloud function also stores the response in the database if it is a new entry.

## Requirements

To use this cloud function you would require the Bluedart Login Credentials and API endpoints which you can get from Bluedart.

## Installation

Please refer to the .env.sample and fill out the credentials and run the deploy command to deploy this cloud function to Google Cloud.

## Sample Request

### Single API

```json
{
  "trackingId": 75484923054,
  "checkpoints": true
}
```

### Bulk API

```json
{
  "trackingId": ["75484923054", "75484923053"],
  "checkpoints": true
}
```

## Web Component

Use the below web component to get a UI

[Tracking Web Component](https://www.npmjs.com/package/@goapptiv-code/bluedart-tracking-web-component)

## Tech Stack

**Server:** Node

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
