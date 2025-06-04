// ==UserScript==
// @name         Auto Synthesize Soul
// @namespace    http://tampermonkey.net/
// @description  Auto Level Match & Exact Match Soul
// @author       PlayerOne
// @version      1.2
// @match        https://pockieninja.online
// @grant        none
// ==/UserScript==

/*
  A script that's created for entertainment purposes, not for any serious or practical use
*/


(function () {
    'use strict';

    let isExactRunning = false;
    let isLevelRunning = false;

    function clickMatch(mode) {
        const buttons = document.querySelectorAll(".theme__button--original");
        let matchButton = null;

        buttons.forEach(btn => {
            if (btn.textContent.trim() === mode) {
                matchButton = btn;
            }
        });

        if (matchButton) {
            console.log(`🎲 Klik tombol '${mode}'...`);
            if (mode === "Exact Match") {
                matchButton.click();
                setTimeout(() => {
                    console.log(`🎲 Klik kedua tombol '${mode}'...`);
                    matchButton.click();
                    setTimeout(() => clickCreate(mode), 500);
                }, 200); // jeda antara klik pertama dan kedua
            } else {
                matchButton.click();
                setTimeout(() => clickCreate(mode), 500);
            }
        } else {
            console.log(`⚠️ Tombol '${mode}' belum tersedia. Mencoba lagi...`);
            setTimeout(() => clickMatch(mode), 500);
        }
    }

    function clickCreate(mode) {
        const buttons = document.querySelectorAll(".theme__button--original");
        let createButton = null;

        buttons.forEach(btn => {
            if (btn.textContent.trim() === "Create") {
                createButton = btn;
            }
        });

        if (createButton) {
            console.log("✅ Klik tombol 'Create'...");
            createButton.click();
            setTimeout(() => {
                if (mode === "Exact Match" && isExactRunning) {
                    clickMatch(mode);
                } else if (mode === "Level Match" && isLevelRunning) {
                    clickMatch(mode);
                }
            }, 500);
        } else {
            console.log("⚠️ Tombol 'Create' tidak ditemukan. Mencoba lagi...");
            setTimeout(() => clickCreate(mode), 500);
        }
    }

    function startExactLoop() {
        if (!isExactRunning) {
            console.log("🎰 Memulai Auto Exact Match...");
            isExactRunning = true;
            clickMatch("Exact Match");
        }
    }

    function stopExactLoop() {
        if (isExactRunning) {
            console.log("🛑 Menghentikan Auto Exact Match...");
            isExactRunning = false;
        }
    }

    function startLevelLoop() {
        if (!isLevelRunning) {
            console.log("🎰 Memulai Auto Level Match...");
            isLevelRunning = true;
            clickMatch("Level Match");
        }
    }

    function stopLevelLoop() {
        if (isLevelRunning) {
            console.log("🛑 Menghentikan Auto Level Match...");
            isLevelRunning = false;
        }
    }

    function createUIButton() {
        let uiDiv = document.createElement("div");
        uiDiv.innerHTML = `
            <div id="autoSynthesizeUI" style="position: fixed; top: 114px; left: 2px; background: rgba(0, 0, 0, 0.8); padding: 12px; z-index: 9999; border-radius: 8px; font-family: sans-serif; min-width: 125px;">
                <h4 style="color: #ffffff; text-align: left; margin-top: 0; margin-bottom: 10px;">Auto Synthesize<br>Bloodsoul</h4>
                <div style="margin-bottom: 10px;">
                    <button id="startExact" class="auto-btn">Exact Match</button>
                </div>
                <div style="margin-bottom: 10px;">
                    <button id="stopExact" class="auto-btn" style="background-color: red; display: none;">Exact Stop</button>
                </div>
                <div style="margin-bottom: 10px;">
                    <button id="startLevel" class="auto-btn">Level Match</button>
                </div>
                <div style="margin-bottom: 10px;">
                    <button id="stopLevel" class="auto-btn" style="background-color: red; display: none;">Level Stop</button>
                </div>
            </div>
            <style>
                .auto-btn {
                    width: 100%;
                    padding: 6px 10px;
                    border: none;
                    border-radius: 5px;
                    background-color: #007bff;
                    color: white;
                    font-size: 13px;
                    cursor: pointer;
                    transition: 0.2s ease-in-out;
                }
                .auto-btn:hover {
                    background-color: #339cff;
                }
                .auto-btn.active {
                    background-color: #dc3545;
                }
            </style>
        `;
        document.body.appendChild(uiDiv);

        document.getElementById("startExact").addEventListener("click", () => {
            startExactLoop();
            toggleButtons("Exact", true);
        });
        document.getElementById("stopExact").addEventListener("click", () => {
            stopExactLoop();
            toggleButtons("Exact", false);
        });
        document.getElementById("startLevel").addEventListener("click", () => {
            startLevelLoop();
            toggleButtons("Level", true);
        });
        document.getElementById("stopLevel").addEventListener("click", () => {
            stopLevelLoop();
            toggleButtons("Level", false);
        });
    }

    function toggleButtons(type, isRunning) {
        const startBtn = document.getElementById(`start${type}`);
        const stopBtn = document.getElementById(`stop${type}`);

        startBtn.style.display = isRunning ? "none" : "inline-block";
        stopBtn.style.display = isRunning ? "inline-block" : "none";
    }

    createUIButton();
    console.log(
      "[AutoSynthesizeSoul-3.0] by Salty\n\nSupport me with a donation:\nhttps://paypal.me/murbawisesa\nhttps://saweria.co/boyaghnia"
    );
})();
