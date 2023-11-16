(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const d='"A2JRCDDMBJLHEV5BFA3Q2PJTM";';console.log(d);let i;const m=new Date().toISOString().split("T")[0];document.getElementById("date_of_birth").setAttribute("max",m);document.getElementById("calculateBtn").addEventListener("click",y);document.getElementById("resetBtn").addEventListener("click",p);function y(){clearInterval(i);const o=new Date(document.getElementById("date_of_birth").value),n=document.getElementById("output"),s=document.querySelector(".output-section");f(o.getDate(),o.getMonth()+1),h(`${o.getFullYear()}-${o.getMonth()+1}-${o.getDate()}`),i=setInterval(()=>{const r=new Date;if(isNaN(o.getTime())){clearInterval(i),alert("please enter a valid date !!!");return}const t=r-o,e=Math.floor(t/1e3),c=Math.floor(e/60),a=Math.floor(c/60),l=Math.floor(a/24),u=Math.floor(l/365);n.textContent=`Your  age is: ${u%365} years ${l%24} days ${a%60} hours ${c%60} minutes ${e%1e3} seconds `,s.style.display="block"},1e3)}function p(){clearInterval(i);const o=document.getElementById("date_of_birth"),n=document.querySelector(".output-section"),s=document.getElementById("fact-output"),r=document.getElementById("weather-output");n.style.display="none",o.value="",s.textContent="",r.textContent=""}let f=async(o,n)=>{const s=document.getElementById("fact-output");try{const t=await(await fetch(`http://numbersapi.com/${n}/${o}/date`)).text();s.textContent=`${t}`,s.style.cssText="font-weight:200 ; font-size: medium;"}catch{s.textContent="Opps , Nothing happened on your birthday"}},h=async o=>{const n=document.getElementById("weather-output");try{const r=await(await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/${o}?key=A2JRCDDMBJLHEV5BFA3Q2PJTM`)).json();console.log(r);const t=r.days[0],e=t.description,c=t.temp,a=t.humidity,l=t.icon;n.textContent=`On your birthday it was ${e}, the temperature was ${c} degree celsius and the humidity was ${a}`}catch{n.textContent="Opps, May be your birth date weather information is not available"}};
