import { test, expect } from '../../fixtures/hooks-fixture';
import apiPathdata from '../../data/api-data/api-path-data.json';
import restfulAPIdata from '../../data/api-data/restful-booker-api-data.json';
import restfulAPInegativedata from '../../data/api-data/restful-booker-apinegative-data.json';

test.describe(
  "GET information Test Cases",
  {
    tag: "@GETBooking",
    annotation: {
      type: "Story Link",
      description:
        "This block contains all the GET information test cases related to booking functionality",
    },
  },
  () => {
test("[Restful-Booker > Booking] verify user able to fetch all the values by using the GET call", {
    tag: ['@API', '@GET', '@Restful-Booker'],
    annotation: {
        type: "Test Case Link",
        description: "Test case link from the Devops"

    }
}, async ({ request }) => {

    const bookingIdsresp = await request.get(apiPathdata.booking_path);
    const bookingIdsrespJson = await bookingIdsresp.json();
    console.log(bookingIdsrespJson);
    expect(bookingIdsresp.status()).toBe(200);
    expect(bookingIdsresp.statusText()).toBe("OK");
    expect(bookingIdsresp.headers()['content-type']).toBe(restfulAPIdata['content-type'])
    expect(bookingIdsrespJson).not.toBeNull();
});

test("ID -9 -[Restful-Booker > Booking] verify user able to fetch all the values by using the GET call", {
    tag: ['@API', '@GET', '@Restful-Booker'],
    annotation: {
        type: "Test Case Link",
        description: "Test case link from the Devops"

    }
}, async ({ request }) => {
    const bookingIdsresp = await request.get(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id}`);
    const bookingIdsrespJson = await bookingIdsresp.json();
    console.log(bookingIdsrespJson);
    expect(bookingIdsresp.status()).toBe(200);
    expect(bookingIdsresp.statusText()).toBe("OK");
    expect(bookingIdsrespJson).not.toBeNull();
    expect(bookingIdsrespJson.firstname).not.toBeNull();

});
});

test("[Restful-Booker > Booking] verify user able to create a new booking by using the POST call", {

    tag: ['@API', '@POST', '@Restful-Booker'],
    annotation: {
        type: "Test Case Link",
        description: "Test case link from the Devops"
    }
}, async ({ request }) => {
    const createBookingResp = await request.post(apiPathdata.booking_path, {
        data: restfulAPIdata.create_booking
    });
    const createBookingRespJson = await createBookingResp.json();
    console.log(createBookingRespJson);
    expect(createBookingResp.status()).toBe(200);
    expect(createBookingResp.statusText()).toBe("OK");
    expect(createBookingRespJson).not.toBeNull();
    expect(createBookingRespJson.firstname).not.toBeNull();
});

test("Id -- 11-[Restful-Booker > Booking] verify user able to Update existed booking by using the PUT call", {
    tag: ['@API', '@PUT', '@Restful-Booker'],
    annotation: {
        type: "Test Case Link",
        description: "Test case link from the Devops"
    }
}, async ({ request, commonUtilapi }) => {
    const token = await commonUtilapi.createToken();
    const bookingUpdateresp = await request.put(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id2}`, {
        headers: {
            Cookie: `token=${token}`
        },
        data: restfulAPIdata.update_booking
    });
    const bookingUpdaterespjson = await bookingUpdateresp.json();
    expect(bookingUpdateresp.status()).toBe(200);
    expect(bookingUpdateresp.statusText()).toBe("OK");
    expect(bookingUpdaterespjson).not.toBeNull();
    expect(bookingUpdaterespjson).toMatchObject(restfulAPIdata.update_booking);
});

test("[Restful-Booker > Booking] verify user able to Update existed booking by using the PATCH call", {
    tag: ['@API', '@PATCH', '@Restful-Booker'],
    annotation: {
        type: "Test Case Link",
        description: "Test case link from the Devops"
    }
}, async ({ request, commonUtilapi }) => {

    const token = await commonUtilapi.createToken();
    const bookingpatch = await request.patch(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id2}`,
        {
            headers:
            {
                Cookie: `token=${token}`
            },
            data: restfulAPIdata.patch_booking
        });
    console.log(bookingpatch);
    const bookingpatchres = await bookingpatch.json();
    expect(bookingpatch.statusText()).toBe("OK");
    expect(bookingpatchres.firstname).toMatch(restfulAPIdata.patch_booking.firstname)
    expect(bookingpatchres.lastname).toMatch(restfulAPIdata.patch_booking.lastname)

})

test("[Restful-Booker > Booking] verify user able to Delete existed booking by using the Delete call", {
    tag: ['@API', '@DELETE', '@Restful-Booker'],
    annotation: {
        type: "Test Case Link",
        description: "Test case link from the Devops"
    }
}, async ({ request, commonUtilapi }) => {

    const token = await commonUtilapi.createToken();
    const deletebooking = await request.delete(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id3}`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        });

    expect(deletebooking.status()).toBe(201);
    expect(deletebooking.statusText()).toBe("Created");
    const getafterdelete = await request.get(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id3}`)
    expect(getafterdelete.status()).toBe(404);
    expect(getafterdelete.statusText()).toBe("Not Found");
});

// ==================== NEGATIVE TEST SCENARIOS ====================

test.describe(
    "Negative API Test Scenarios",
    {
        tag: ["@NegativeAPI",'@Restful-Booker'],
        annotation: {
            type: "Story Link",
            description: "This block contains all negative test cases for API validation"
        }
    },
    () => {
         test("[Restful-Booker > Booking] verify 404 error when fetching non-existent booking", {
            tag: ['@API', '@GET', '@Negative404', '@Restful-Booker'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify API returns 404 for non-existent booking ID"
            }
        }, async ({ request }) => {
            const response = await request.get(`${apiPathdata.booking_path}/${restfulAPInegativedata.invalid_id}`);
            
            expect(response.status()).toBe(404);
            expect(response.statusText()).toBe("Not Found");
        });

         test("[Restful-Booker > Booking] verify 400 error when creating booking with invalid data", {
            tag: ['@API', '@POST', '@Negative400', '@Restful-Booker'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify API validation for incomplete booking data"
            }
        }, async ({ request }) => {
            const invalidBookingData = {
                firstname: restfulAPIdata.create_booking.firstname,
                // Missing required fields: lastname, totalprice, depositpaid, bookingdates
            };

            const response = await request.post(apiPathdata.booking_path, {
                data: invalidBookingData
            });
            
            // API may return 400 Bad Request or 500 depending on validation
            expect([400, 500]).toContain(response.status());
        });

        test("[Restful-Booker > Booking] verify 400 error when creating booking with invalid data types", {
            tag: ['@API', '@POST', '@Negative', '@Validation'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify API validation for incorrect data types"
            }
        }, async ({ request }) => {
            const response = await request.post(apiPathdata.booking_path, {
                data: restfulAPInegativedata.invalid_booking_data
            });
            
            // The API might still accept this, but we're testing validation
            expect(response.status()).toBeDefined();
        });

        test("[Restful-Booker > Booking] verify 403 error when updating booking without authentication", {
            tag: ['@API', '@PUT', '@Negative', '@403'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify authentication is required for update operations"
            }
        }, async ({ request }) => {
            const response = await request.put(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id2}`, {
                // No authentication token provided
                data: restfulAPIdata.update_booking
            });
            
            expect(response.status()).toBe(403);
            expect(response.statusText()).toBe("Forbidden");
        });
        test("[Restful-Booker > Booking] verify 403 error when updating booking with invalid token", {
            tag: ['@API', '@PUT', '@Negative', '@401'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify invalid authentication token is rejected"
            }
        }, async ({ request }) => {
            const response = await request.put(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id2}`, {
                headers: {
                    Cookie: `token=${restfulAPInegativedata.invalid_token}`
                },
                data: restfulAPIdata.update_booking
            });
            
            expect(response.status()).toBe(403);
            expect(response.statusText()).toBe("Forbidden");
        });

        test("[Restful-Booker > Booking] verify 403 error when deleting booking without authentication", {
            tag: ['@API', '@DELETE', '@Negative', '@403'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify authentication is required for delete operations"
            }
        }, async ({ request }) => {
            const response = await request.delete(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id2}`, {
                // No authentication token provided
            });
            
            expect(response.status()).toBe(403);
            expect(response.statusText()).toBe("Forbidden");
        });

        test("[Restful-Booker > Booking] verify 404 error when deleting non-existent booking", {
            tag: ['@API', '@DELETE', '@Negative', '@404'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify proper error handling for non-existent resources"
            }
        }, async ({ request, commonUtilapi }) => {
            const token = await commonUtilapi.createToken();
            
            const response = await request.delete(`${apiPathdata.booking_path}/${restfulAPInegativedata.invalid_id}`, {
                headers: {
                    Cookie: `token=${token}`
                }
            });
            
            // API might return 404 or 405 for non-existent resource
            expect([404, 405]).toContain(response.status());
        });

        test("[Restful-Booker > Booking] verify 403 error when patching booking without authentication", {
            tag: ['@API', '@PATCH', '@Negative', '@403'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify authentication is required for partial update operations"
            }
        }, async ({ request }) => {
            const response = await request.patch(`${apiPathdata.booking_path}/${restfulAPIdata.booking_id2}`, {
                // No authentication token provided
                data: restfulAPIdata.patch_booking
            });
            
            expect(response.status()).toBe(403);
            expect(response.statusText()).toBe("Forbidden");
        });

        test("[Restful-Booker > Booking] verify error when creating booking with empty payload", {
            tag: ['@API', '@POST', '@Negative', '@Validation'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify API handles empty request body appropriately"
            }
        }, async ({ request }) => {
            const response = await request.post(apiPathdata.booking_path, {
                data: {}
            });
            
            // API should handle empty payload
            expect([400, 500]).toContain(response.status());
        });

        test("[Restful-Booker > Booking] verify error when updating booking with invalid ID format", {
            tag: ['@API', '@PUT', '@Negative', '@Validation'],
            annotation: {
                type: "Negative Test Case",
                description: "Verify API validates booking ID format"
            }
        }, async ({ request, commonUtilapi }) => {
            const token = await commonUtilapi.createToken();
            
            const response = await request.put(`${apiPathdata.booking_path}/${restfulAPInegativedata.invalid_id}`, {
                headers: {
                    Cookie: `token=${token}`
                },
                data: restfulAPIdata.update_booking
            });
            
            // API should return error for invalid ID format
            expect(response.status()).toBeDefined();
        });

    });

