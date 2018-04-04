=== Recurring Pickup Requests === 

Recurring Pickup Request General Flow:
    1. DA requests a recurring pickup
    2. Send notifications to RAs -> a RA claims (3 full days, 10pm)
    3. Send notifications to DGs -> a DG claims (3 full days, 10pm)
    4. Send confirm notification back to DA.
    5. Create the actual Delivery objects.

Cases/Scenarios:
    Receiving Agencies
        1. When to send notifications:
            a. DA requested a specific RA: 
                i. Send notification to the RA regardless of availabilities.
            b. DA didn't specify a RA: 
                i. Send notification to all RAs with matching availabilities
                ii. No RA available: send "no available" notification back
                    to DA.
        2. Outcomes:
            a. If one RA claimed, continue down the flow.
            b. If all RA rejected, send "request rejected" back to DA.
            c. If no one RA claims for 3 days, send "request expired" back 
               to DA.

    Deliverer Groups
        After a RA claims, the cases are the same as RA's above (without 
        availabilities aspect).
     