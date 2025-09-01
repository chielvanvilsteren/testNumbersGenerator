import {
    generateTestBSN,
    generateTestDutchIBAN,
    generateTestMobileNumber
} from "test-numbers-generator";
import {getRandomAdresInPlaatsnaam, getRandomPlaatsnaam} from "test-numbers-generator/dist/postcodeService";



const testBSN = generateTestBSN()
const testIban = generateTestDutchIBAN("RABO")
const testMobile = generateTestMobileNumber.Netherlands()
const testMobileTurk = generateTestMobileNumber.Turkey()
getRandomAdresInPlaatsnaam('Deventer').then(adress => {
    console.log(adress)
})

getRandomPlaatsnaam()
