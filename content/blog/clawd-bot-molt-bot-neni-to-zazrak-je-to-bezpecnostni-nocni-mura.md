---
title: "Clawd Bot / Molt Bot: Není to zázrak. Je to bezpečnostní noční můra."
excerpt: Clawd Bot je AI chatbot postavený na modelu Claude Opus 4.5, který
  funguje přes Telegram, WhatsApp a cron (plánovač zpráv). Lidé kolem něj budují
  obrovský hype, ale ve skutečnosti nedělá nic, co by AI neuměla už dávno. A co
  je horší — má závažné bezpečnostní díry, kvůli kterým mohou cizí lidé získat
  přístup k vašim datům.
category: Business
date: Feb 14, 2026
readTime: 6 min čtení
image: https://miro.medium.com/v2/resize:fit:1400/1*Sz_4P3PYnv2itf_2cAQPzQ.png
author: Jaroslav Pecháček
authorRole: CEO of Growthspect
---
### **Co je vlastně Clawd Bot?**

Clawd Bot (někdy označovaný jako Molt Bot) je wrapper — tedy obal — kolem AI modelu Claude Opus 4.5 od společnosti Anthropic. Funguje jako chatbot integrovaný do aplikací Telegram a WhatsApp. Využívá také technologii cron, což je v informatice systém pro plánování automatických úloh v pravidelných intervalech. Jednoduše řečeno: cron je plánovač zpráv, který umožňuje botovi posílat zprávy nebo provádět akce v nastavený čas.

Na sociálních sítích se z Clawd Botu stala „zázračná technologie“. Lidé sdílejí videa, jak jim bot organizuje soubory, dělá research nebo nakupuje online kurzy. Zní to úžasně — dokud se na to nepodíváte blíž.

### **Proč to není žádná revoluce**

Tady je nepříjemná pravda: věci, které Clawd Bot umí, zvládá AI dělat už dlouho. Nejde o žádný průlom. Jde o funkce, které existují v každém velkém jazykovém modelu (LLM) — od ChatGPT přes Gemini až po samotný Claude.

Jediný důvod, proč je kolem toho tolik hluku? Spousta firem ráda říká, že „používá AI“, i když jediná věc, kterou jim umělá inteligence dělá, je oprava e-mailů. Je to marketingová narativa, nikoli technologická inovace.

**DŮLEŽITÝ DETAIL**
Sám zakladatel Clawd Botu otevřeně říká, že lidé, kteří nejsou technicky zdatní, by si ho neměli stahovat. To je docela silné prohlášení na produkt, který se na internetu prezentuje jako řešení pro každého.

### **Takzvané „úspěšné“ use casy**

Podívejme se na příklady, které komunita kolem Clawd Botu považuje za velké úspěchy, a srovnejme je s realitou.

**USE CASE #1**
Organizace složky Downloads
Toto je základní funkce Finderu v ekosystému Apple. Na Macu to zvládnete dvěma kliknutími. Nepotřebujete k tomu AI chatbota.

**USE CASE #2**
Research a analýza
Research je core funkce každého LLM modelu. Mimochodem — když někdo říká „dělám research s AI“, většinou to znamená: nedělám teď nic produktivního na AI trhu.

Žádný z těchto příkladů nepředstavuje něco, co by vyžadovalo speciálního bota. Jsou to standardní schopnosti dostupné v desítkách nástrojů — často zdarma.

### Nebezpečná autonomie: Když si bot sám nakupuje

Tady to začíná být opravdu znepokojivé. Existují dokumentované případy, kdy Clawd Bot provedl autonomní transakce bez explicitního souhlasu uživatele.

V jednom případě si bot sám koupil online kurz Alex Hormozi za 3 000 dolarů (přibližně 70 000 Kč). Prostě se rozhodl, že ten kurz potřebuje, a provedl nákup. Bot si také sám vybírá, kolik tokenů (výpočetních jednotek AI modelu) spotřebuje, což znamená, že uživatelé nemají plnou kontrolu nad náklady.

**⚠ FINANČNÍ RIZIKO**
AI agent, který má přístup k vaší platební kartě a sám rozhoduje o nákupech, je obrovské finanční riziko. Bez striktních autorizačních protokolů může dojít k neoprávněným transakcím, které nemůžete snadno vrátit.

### **Bezpečnostní noční můra**

A teď ta nejdůležitější část celého článku. Bezpečnost Clawd Botu je v katastrofálním stavu — a většina uživatelů o tom nemá ani tušení.

### **Otevřené servery bez zabezpečení**

Spousta lidí hostuje Clawd Bota na VPS serverech (Virtual Private Server — virtuální soukromý server). Problém je, že přes 900 Clawd Bot chatů není uzavřených a dají se volně otevřít. To znamená, že kdokoliv na internetu může vstoupit do těchto konverzací a vidět vše, co uživatel s botem probíral.

Tohle číslo přitom pochází z malého scrapu (automatického skenování). Reálný počet nezabezpečených instancí bude mnohonásobně vyšší.

### **Shodan: vyhledávač otevřených portů**

A teď to nejhorší. Existuje systém jménem Shodan. Shodan je speciální vyhledávač, který prochází všechny veřejné URL adresy a IP adresy na internetu a indexuje otevřené porty a služby. Představte si ho jako Google, ale místo webových stránek hledá nezabezpečené servery.

Shodan query: “Clawdbot control” → výsledek: tisíce serverů s otevřeným přístupem k Clawd Bot instancím
Stačí do Shodanu zadat „Clawdbot control“ a dostanete seznam tisíců serverů, které mají otevřeného Clawd Bota. Pokud bot běží na serveru Nginx (což je jeden z nejpoužívanějších webových serverů), získáte kompletní přístup k celé instanci. A protože je Clawd Bot napojený na různé služby uživatele, máte přístup ke všemu — chatům, nastavení i napojeným aplikacím.

Útočník také automaticky vidí IP adresu serveru, což otevírá dveře k dalším typům útoků — od DDoS až po cílené hackování.

### **Reálné případy zneužití**

Už existují dokumentované případy, kdy se někdo tímto způsobem dostal do cizího Clawd Botu a zjistil:

Identitu uživatele — kdo bota používá a jaké má osobní údaje.
Bankovní údaje — pokud byly napojené na platební systémy.
Kompletní historii chatu — všechny konverzace s AI, včetně citlivých dotazů.
Napojené aplikace — všechny služby, ke kterým měl bot přístup.

Jednoduše řečeno: někdo vstoupil do cizího Clawd Botu a získal přístup k celému digitálnímu životu uživatele.

### **Proč je tohle problém pro celý AI trh**

Clawd Bot není jen ojedinělý případ špatného zabezpečení. Je to symptom většího problému: lidé nasazují AI agenty do produkce bez jakéhokoliv bezpečnostního auditu. Nikdo neví, kde přesně jsou data hostovaná. Nikdo nekontroluje, kdo má přístup k otevřeným portům. A nikdo se neptá, jestli je v pořádku, že AI agent má autonomní přístup k platební kartě.

V kybernetické bezpečnosti existuje princip zvaný „principle of least privilege“ (princip nejmenších oprávnění). Říká, že každý systém by měl mít přístup jen k tomu, co absolutně nutně potřebuje. Clawd Bot tento princip porušuje na každém kroku.

### **Co z toho plyne: AI ano, ale s rozumem**

Nechceme říkat, že AI je špatná. Právě naopak — AI implementace je to, čemu se v Growthspectu věnujeme každý den. Ale existuje obrovský rozdíl mezi správně implementovanou AI a hype produktem, který nemá základní bezpečnostní opatření.

Pokud zvažujete nasazení AI chatbota ve vaší firmě, ptejte se na tyto otázky:
Kde jsou hostovaná data?
Kdo má přístup k serverům?
Jaké bezpečnostní protokoly jsou implementované?
Má AI agent autonomní přístup k finančním prostředkům?
Existuje logovací a auditní systém?

Pokud na tyto otázky nedostanete jasné odpovědi, nepoužívejte to.

### **ZÁVĚR**

Clawd Bot je ukázkový příklad AI hype bez substance. Nabízí funkce, které AI umí už roky, a balí je do nebezpečně nezabezpečeného balíčku. Než si cokoliv takového nainstalujete, ujistěte se, že rozumíte rizikům — nebo se obraťte na odborníky, kteří vám pomohou implementovat AI správně a bezpečně.
