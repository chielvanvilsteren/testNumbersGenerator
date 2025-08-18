import {
    generateTestBSN,
    generateTestDutchIBAN,
    generateTestMobileNumber,
    testNumbersGenerator
} from "test-numbers-generator";


const testBSN = generateTestBSN()
const testIban = generateTestDutchIBAN("RABO")
const testMobile = generateTestMobileNumber.Netherlands()
const testMobileTurk = generateTestMobileNumber.Turkey()
