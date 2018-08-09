export const navPages = [
    {
      name: "Home",
      url: "/",
    },
   {
      name: "Order a Print",
      url:"/order-print"
    },
    {
      name:"Browse Models",
      url:"/browse-models"
    },
]

export const servicePages = [
    //Either drop down for services or just flat link to it.
    {
      name:"Library",
      url:"https://ces.library.com"
    },
   {
      name:"3DPrinting",
      url:"https://ces.3Dprinting.com"
    }
    
];


export const homeURL = "http://localhost:3000";


export const LOGIN_PATH = homeURL + "/users/login";
export const REGISTER_PATH = homeURL + "/users/register";
export const USER_PROFILE_PATH = homeURL + "/account/:uid";
//Only owner can get to inventory and update profile
export const USER_INVENTORY_PATH = "/account/inventory";
export const UPDATE_USER_PROFILE_PATH = "/account/update";
export const ORDER_PRINT_PATH = "/order-print";



