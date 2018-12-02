import { WebAPI } from '../constants/firebase';

async function getAllDonations(eventid) {
console.log(WebAPI);
    return fetch(`${WebAPI}/getdonations/${eventid}`, {
        timeout: 1200*1000,
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    });

}

async function updateDonation(obj) {
  
        return fetch(`${WebAPI}/updateDonation`, {
            timeout: 1200*1000,
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify(obj)
        });
    
    }

export default {
    getAllDonations,
    updateDonation
}