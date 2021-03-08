# Instructions

### Pull latest registration info from CVENT and format it for Hopin invites.

## To generate the latest file see the following steps:

1. Reporting > Reports > Debit and Credit Details (Financial Reports)
2. Create filters:
   - Order Type: <b>Order Request</b> or <b>Order Charge</b>
   - Agenda Item Name: <b>Full Conference</b> or <b>Workshop</b>
3. Set transaction date filter (Top)
4. Download .csv file (Settings button > export to comma seperated value)

## Run Program

`node index.js latest.csv out.csv`

### Formatted information will be in out.csv file.
