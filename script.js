const quoteContainer = document.getElementById('quote-container');
const quoteArea = document.getElementById('quote-text');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('tweeter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading Spinner
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading Spinner
function hideLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
function newQuote(){
    showLoadingSpinner();

    // Pick a random quote from apiQuotes array
    try{
        const quote = apiQuotes[Math.floor (Math.random() * apiQuotes.length)];
    
        // check if Author field is blank and replace  it with Unknown
        if(!quote.author){
            authorText.textContent = '~ Unknown';
        }else{
            authorText.textContent = '~ ' + quote.author;
        }

        // check quote length to determine styling
        if(quote.text.length > 80){
            quoteArea.classList.add('long-quote');
        }else{
            quoteArea.classList.remove('long-quote');
        }

        // Set Quote, Hide Loader
        quoteText.textContent = quote.text;
        hideLoadingSpinner();
    }
    catch(error){
        console.log(error);
        alert("Oops.. Something went wrong!! \nCheck your network connection or try again later!!");
        hideLoadingSpinner();
    }
}

// Get Quotes from API
async function getQuotes(){
    showLoadingSpinner();

    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    }catch(error){
        console.log(error);
        alert("Oops.. Something went wrong!! \nCheck your network connection or try again later!!");
        hideLoadingSpinner();
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();