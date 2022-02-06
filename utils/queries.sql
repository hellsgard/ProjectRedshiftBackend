
//Only brings back location data for ATM transactions based on ID - map purposes
    const atmLoc = await sequelize.query(
        `SELECT ap.streetName, ap.postcode, ap.latitude, ap.longitude
        FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
        JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId JOIN atmTransactions am ON ba.cardNumber=am.bankCardNumber
        JOIN atmpoint ap ON am.atmId=ap.atmId 
        WHERE ci.citizenID LIKE ?`,
        {replacements: [req.params.id], type: QueryTypes.SELECT });
        console.log(atmLoc);

Find eveyone working at the same place:

SELECT * FROM peoplebusinessaddress WHERE businessName IN (SELECT businessName FROM peoplebusinessaddress 
WHERE forenames= 'Aimee' AND surname='Spence' AND dateOfBirth='1983-07-24');

Find everyone at the same home address (lives with):

SELECT * FROM citizen WHERE homeAddress IN (SELECT homeAddress FROM citizen WHERE ci.citizenID LIKE ?)`

--  all epos transactions and locations based on ID

SELECT ba.cardNumber, et.eposId, et.timestamp, et.amount, ep.vendor, ep.latitude, ep.longitude
FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
JOIN eposTransactions et ON ba.cardNumber=et.bankCardNumber
JOIN epos ep ON et.eposID=ep.id
WHERE ci.citizenID = '?';

# all epos transactions but also returns account info and citizenID

SELECT ci.citizenID, pb.accountNumber, pb.bank, ba.cardNumber, et.eposId, et.timestamp, et.amount, ep.vendor, ep.latitude, ep.longitude
FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
JOIN eposTransactions et ON ba.cardNumber=et.bankCardNumber
JOIN epos ep ON et.eposID=ep.id
WHERE ci.citizenID = '1111753222';
# tested with citizen ID 1111753222 - 3 transactions at Russel hotel

-- # all atm transactions and locations based on ID

SELECT ba.cardNumber, am.atmId, am.timestamp, am.amount, ap.operator, ap.streetName, ap.postcode, ap.latitude, ap.longitude
FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
JOIN atmTransactions am ON ba.cardNumber=am.bankCardNumber
JOIN atmpoint ap ON am.atmId=ap.atmId 
WHERE ci.citizenID = ?;

# all atm transactions but also returns account info and citizenID
SELECT ci.citizenID, pb.accountNumber, pb.bank, ba.cardNumber, am.atmId, am.timestamp, am.amount, ap.operator, ap.streetName, ap.postcode, ap.latitude, ap.longitude
FROM citizen ci JOIN peoplebankaccount pb ON pb.forenames=ci.forenames AND pb.surname=ci.surname AND pb.dateOfBirth=ci.dateOfBirth
JOIN bankcard ba ON pb.bankAccountId=ba.bankAccountId 
JOIN atmTransactions am ON ba.cardNumber=am.bankCardNumber
JOIN atmpoint ap ON am.atmId=ap.atmId 
WHERE ci.citizenID LIKE 1111657921;







