import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Grid3X3, List } from 'lucide-react';

// Negăsite aici :
// Risotto cu ciuperci, Mushroom Risotto, orez arborio 250g, mix ciuperci 100g, cremă cuccina, parmezan, pastă trufe, usturoi, 35 lei
// Risotto cu creveți, Shrimp Risotto, orez arborio 250g, creveți 90g, sos pomodorro 70 ml, unt, parmesan, 40 lei
// Risotto primavera, Primavera Risotto, orez arborio 250g, legume 200g, usturoi, parmesan, unt, 35 lei
// Tochitură cu mămăligă, ou și brânză, tochitură (ceafă porc 100g, kaizer 80g, cârnați 80g, sos roșii, usturoi), ou 50g, mămăligă 150g, brânză 50g, 45 lei
// Ficăței la tigaie, ficăței pui 200g, ceapă albă 50g, sos roșii 100g, usturoi, vin 30ml, 30 lei
// Saramură de pui cu mămăligă, pulpă pui 200g, legume 250g, mămăligă, 30 lei
// Pui gratinat, piept pui 200g, crema cuccina 70ml, mozzarella 30g, 35 lei
// Pui la ceaun, mujdei, cartofi prăjiți, 60 lei
// Ciolan porc stinko, 50 lei
// Doradă la grătar, 40 lei
// Cârnați măcelărești semiafumați la grătar, 20 lei
// Șnițel gratinat pui/porc, carne 150g, mozzarella 50g, pomodorro 30g, 25 lei
// Chilli cheese, 25 lei
// Pui shanghai, piept pui 150g, salată coleslaw, ou, muștar, făină, 22 lei
// Ardei iute, 3 lei
// Pachet, 2 lei
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const menuCategories = {
  'Antreuri': [
    {
      ro: 'Omletă simplă / Ouă ochi',
      en: '150 gr.',
      ingredients: '3 ouă, sare, piper',
      price: '12 Lei'
    },
    {
      ro: 'Omletă țărănească',
      en: '170 gr.',
      ingredients: 'ardei kapia 30g, ceapă 30g, bacon 40g, 2 ouă',
      price: '17 Lei'
    },
    {
      ro: 'Omletă Quesadilla',
      en: '200 gr.',
      ingredients: '2 ouă, ardei kapia 30g, ceapă 30g, bacon 30g, mozzarella 30g, 1 lipie tortilla',
      price: '20 Lei'
    },
    {
      ro: 'Bruschete cu roșii',
      en: '220 gr.',
      ingredients: 'roșii 160g, sare 3g, ulei măsline 10ml, usturoi 10g, pâine toast 50g',
      price: '20 Lei'
    },
    {
      ro: 'Bruschete cu somon crud uscat',
      en: '200 gr.',
      ingredients: 'pâine toast 50g, cremă brânză 50g, somon crud uscat 100g, lămâie 50g',
      price: '25 Lei'
    },
    {
      ro: 'Bruschete cu prosciutto',
      en: '200 gr.',
      ingredients: 'pâine toast 50g, cremă brânză 50g, prosciutto cotto 120g',
      price: '25 Lei'
    },
    {
      ro: 'Bruschete roșii și mozzarella',
      en: '250 gr.',
      ingredients: 'roșii 160g, sare 3g, ulei măsline 10ml, usturoi 10g, pâine toast 50g, mozzarella 40g',
      price: '25 Lei'
    },
    {
      ro: 'Bruschete cu pastă de măsline',
      en: '180 gr.',
      ingredients: 'pâine toast 50g, pastă măsline 130g',
      price: '15 Lei'
    },
    {
      ro: 'Mix Bruschete',
      en: '360 gr.',
      ingredients: 'bruschete cu roșii 100g, bruschete cu prosciutto 100g, bruschete cu somon 80g, bruschete cu pastă de măsline 80g',
      price: '30 Lei'
    },
    {
      ro: 'Platou de mezeluri italiene',
      en: '400 gr.',
      ingredients: 'prosciutto  cotto  80g,  prosciutto  crudo  100g,  salam  italian  50g, salam napoli 50g, coppa 100g, rosii cherry 50g',
      price: '90 Lei'
    },
    {
      ro: 'Platou de brânzeturi',
      en: '450 gr.',
      ingredients: 'mozzarella 100g, brie 100g, gorgonzola 100g, brânză capră 100g, struguri 70g, nuci 70g',
      price: '90 Lei'
    },
    {
      ro: 'Platou rece',
      en: '550 gr.',
      ingredients: 'salam uscat 50gr, șunculiță afumată 50gr, icre crap 100gr, zacuscă legume 100 gr, telemea vacă 100 gr, legume 100 gr, măsline 50 gr',
      price: '100 Lei'
    },
    {
      ro: 'Carcalete',
      en: '370 gr.',
      ingredients: 'cârnați 70 gr, brânză 50 gr, 2 ouă, cartofi prăjiți 150 gr',
      price: '21 Lei'
    }
  ],

  'Salate' : [
      {
      ro: 'Salată Caesar',
      en: '380 gr.',
      ingredients: 'salată iceberg 200g, sos caesar 60g, piept pui 80g, crutoane 40g, scalie parmezan 20g',
      price: '35 Lei'
    },
    {
      ro: 'Salată Caesar cu crispy',
      en: '380 gr.',
      ingredients: 'salată iceberg 200g, sos caesar 60g, piept pui 80g, pesmet 30g, crutoane pâine 40g, scalie parmezan 30g ',
      price: '35 Lei'
    },
    {
      ro: 'Salată cu somon',
      en: '370 gr.',
      ingredients: 'salată iceberg 100g, somon crud uscat 70g, roșii cherry 50g, ceapă roșie 50g, castravete 50g, capere 10 g, ulei măsline 20ml, zeamă lămâie 20ml',
      price: '40 Lei'
    },
    {
      ro: 'Salată grecească',
      en: '330 gr.',
      ingredients: 'salată  verde  80g,  brânză  feta  50g,  roșii  50  g,  castravete  50g,  ceapă roșie 50g, măsline 30g, ulei măsline 20g',
      price: '35 Lei'
    },
    {
      ro: 'Salată bulgărească',
      en: '400 gr.',
      ingredients: 'salată  verde  50g,  roșii  50g,  brânză  50g,  ardei  capia  40g,  ceapă  40g, castravete 40g, ou fiert 50g, măsline 30g, șuncă 50g',
      price: '35 Lei'
    }
  ],

  'Ciorbe / Soups': [
    { 
      ro: 'Ciorbă de burtă vită', 
      en: '350 ml.',
      ingredients: 'burtă vită 100gr, ouă, smântână, usturoi',
      price: '20 Lei'
    },
    { 
      ro: 'Ciorbă de vacuță', 
      en: '350 ml.',
      ingredients: 'carne de văcuță 80gr, legume, borș',
      price: '20 Lei'
    },
    { 
      ro: 'Ciorbă de pui a la grec', 
      en: '350 ml.',
      ingredients: 'piept pui 80 gr, smântână, ouă, mărar, lămâie',
      price: '20 Lei'
    },
    { 
      ro: 'Ciorbă de perișoare de porc', 
      en: '350 ml.',
      ingredients: 'perișoare 90 gr, legume, borș, ou',
      price: '17 Lei'
    },
    { 
      ro: 'Ciorbă de pui cu tăiței de casă', 
      en: '350 ml.',
      ingredients: 'carne de pui 80gr, tăiței, legume, borș',
      price: '17 Lei'
    },
    { 
      ro: 'Supă cremă legume', 
      en: '350 ml.',
      ingredients: 'cremă cucina, unt, crutoane',
      price: '17 Lei'
    }

  ],

  'Paste / Pasta': [
    {
      ro: 'Paste a la Lemon',
      en: '350 gr.',
      ingredients: 'Paste, sos de unt, pui crocant picant (450g)',
      price: '35 Lei'
    },
    {
      ro: 'Paste Arrabiata',
      en: '410 gr.',
      ingredients: 'paste 150g, pomodorro 150g, măsline 50g, ardei iute 20g, roșii cherry 40g',
      price: '30 Lei'
    },
    {
      ro: 'Paste Carbonara',
      en: '400 gr.',
      ingredients: 'paste 150 g, cremă cuccina 140g, bacon 70g, parmesan 30g, ou',
      price: '40 Lei'
    },
    {
      ro: 'Paste Quattro Formaggi',
      en: '460 gr.',
      ingredients: 'paste 150g, gorgonzola 60g, parmesan 30g, mozzarella 50g, brie 50g, unt 30g, cremă cuccina 80g',
      price: '40 Lei'
    },
    {
      ro: 'Paste siciliene',
      en: '480 gr.',
      ingredients: 'paste 150g, bacon 30g, piept pui 70g, ciuperci 30g, ardei kapia 30g, pomodorro 120g, mozzarella 50g',
      price: '45 Lei'
    },
    {
      ro: 'Paste cu fructe de mare',
      en: '420 gr.',
      ingredients: 'paste 150g, mix fructe de mare 150g, pomodorro 120g, pătrunjel, usturoi 10g',
      price: '45 Lei'
    },

    {
      ro: 'Tagliatelle cu creveți',
      en: '400 gr.',
      ingredients: 'tagliatelle 150g, creveți 100g, pomodorro 120g, roșii cherry 30g, pătrunjel',
      price: '45 Lei'
    }
  ],

  'Risotto': [
    {
      ro: 'Risotto cu ciuperci',
      en: '450 gr.',
      ingredients: 'orez arborio 250g, mix ciuperci 100g, cremă cuccina, parmezan, pastă trufe, usturoi',
      price: '35 Lei'
    },
    {
      ro: 'Risotto cu creveți',
      en: '450 gr.',
      ingredients: 'orez arborio 250g, creveți 90g, sos pomodorro 70 ml, unt, parmesan',
      price: '40 Lei'
    },
    {
      ro: 'Risotto primavera',
      en: '450 gr.',
      ingredients: 'orez arborio 250g, legume 200g, usturoi, parmesan, unt',
      price: '35 Lei'
    }
  ],

  'Fel principal / Main Course': [
    {
      ro: 'Pastramă de oaie la ceaun cu mămăligă',
      en: '350 gr.',
      ingredients: 'pastramă 200g, mămăligă',
      price: '45 Lei'
    },
    {
      ro: 'Pomana porcului',
      en: '500 gr.',
      ingredients: 'ceafă porc 200g, mămăligă 200g, murături 100g',
      price: '40 Lei'
    },
    {
      ro: 'Pui gorgonzola',
      en: '390 gr.',
      ingredients: 'piept pui 200g, cremă cuccina 130g, gorgonzola 50g, parmesan 10g',
      price: '45 Lei'
    },
    {
      ro: 'Pui cu smântână și ciuperci',
      en: '400 gr.',
      ingredients: 'piept pui 200g, ciuperci 50g, cremă cuccina 130g, usturoi 10g, parmesan 10g',
      price: '45 Lei'
    },
    {
      ro: 'Tigaie picantă de porc și orez',
      en: '400 gr.',
      ingredients: 'ceafă  porc  130g,  ceapă  60g,  ardei  kapia  60g,  ardei  iute  20g,  ciuperci  70g, pomodorro 70ml, sweet chilli 30ml, vin, usturoi 20 ml, orez',
      price: '40 Lei'
    },
    {
      ro: 'Tigaie picantă de pui și orez',
      en: '400 gr.',
      ingredients: 'piept pui 130g, ceapă 60g, ardei kapia 60g, ardei iute 20g, ciuperci 70g, pomodorro 70ml, sweet chilli 30ml, vin, usturoi 20ml, orez',
      price: '40 Lei'
    }, 
    {
      ro: 'Tochitură cu mămăligă, ou și brânză',
      en: '500 gr.',
      ingredients: 'tochitură (ceafă porc 100g, kaizer 80g, cârnați 80g, sos roșii, usturoi), ou 50g, mămăligă 150g, brânză 50g',
      price: '45 Lei'
    },
    {
      ro: 'Ficăței la tigaie',
      en: '380 gr.',
      ingredients: 'ficăței pui 200g, ceapă albă 50g, sos roșii 100g, usturoi, vin 30ml',
      price: '30 Lei'
    },
    {
      ro: 'Saramură de pui cu mămăligă',
      en: '360 gr.',
      ingredients: 'pulpă pui 200g, legume 250g, mămăligă',
      price: '30 Lei'
    },
    {
      ro: 'Pui gratinat',
      en: '300 gr.',
      ingredients: 'piept pui 200g, crema cuccina 70ml, mozzarella 30g',
      price: '35 Lei'
    },
    {
      ro: 'Pui la ceaun',
      en: '600 gr.',
      ingredients: 'mujdei, cartofi prăjiți',
      price: '60 Lei'
    },
    {
      ro: 'Ciolan porc stinko',
      en: '650 gr.',
      ingredients: 'mujdei, cartofi prăjiți',
      price: '50 Lei'
    },
    {
      ro: 'Sarmale în foi de varză și mămăligă',
      en: '400 gr.',
      ingredients: 'Carne tocată de vită, orez, ulei, mămăligă, ardei iute (5 buc)',
      price: '30 Lei'
    },
    {
      ro: 'Valdostana cu piure',
      en: '350 gr.',
      ingredients: 'piept pui 150g, ciuperci 50g, ceapă 30g, cașcaval 50g, șuncă 30g, piure',
      price: '45 Lei'
    },
  ],

    'Grătar': [
    {
      ro: 'Mici grătar',
      en: '80 gr.',
      ingredients: '',
      price: '6 Lei'
    },
    {
      ro: 'Cârnați proaspeți de porc',
      en: '200 gr.',
      ingredients: '',
      price: '25 Lei'
    },
    {
      ro: 'Ceafă porc la grătar',
      en: '200 gr.',
      ingredients: 'Ceafă de porc 320g, condiment grătar 10g (200g)',
      price: '25 Lei'
    },
    {
      ro: 'Cotlet la grătar',
      en: '200 gr.',
      ingredients: 'Cotlet de porc, condimente grătar (250g)',
      price: '25 Lei'
    },
    {
      ro: 'Frigărui de porc cu legume',
      en: '200 gr.',
      ingredients: 'cotlet de porc 100g, legume 100g',
      price: '25 Lei'
    },
    {
      ro: 'Piept pui la grătar',
      en: '200 gr.',
      ingredients: 'Piept pui la grătar (200g)',
      price: '35 Lei'
    },
    {
      ro: 'Pulpă pui la grătar',
      en: '200 gr.',
      ingredients: '',
      price: '25 Lei'
    },
    {
      ro: 'Frigărui de pui cu legume',
      en: '200 gr.',
      ingredients: 'piept pui 100g, legume 100g',
      price: '25 Lei'
    },
    {
      ro: 'Somon la grătar cu orez',
      en: '250 gr.',
      ingredients: 'somon 180g, orez',
      price: '45 Lei'
    },
    {
      ro: 'Doradă la grătar',
      en: '400 gr.',
      ingredients: '',
      price: '40 Lei'
    },
    {
      ro: 'Cârnați măcelărești semiafumați la grătar',
      en: '150 gr.',
      ingredients: '',
      price: '20 Lei'
    },
  ],


  'Platouri calde': [
  
    {
      ro: 'Platou 2 persoane',
      en: '800 gr.',
      ingredients: '2 mici, ceafă 200g, cârnați proaspeți 200g, cartofi 150g, murături 100g',
      price: '90 Lei'
    },
    {
      ro: 'Platou 4 persoane',
      en: '1.7 kg.',
      ingredients: 'mici, ceafă 300g, cârnați proaspeți 200g, frigărui pui 200g, pulpă pui 200g, cartofi 300g, murături 150g, mujdei, muștar',
      price: '180 Lei'
    },
    {
      ro: 'Platoul berarilor',
      en: '600 gr.',
      ingredients: 'cartofi 150g, măsline pane 100g, chilli cheese 100g, ceapă pane 50 g, castravete crocant 50g, lipie crispy 50g, 2 sosuri',
      price: '80 Lei'
    }
  ],

  'Minuturi': [
    {
      ro: 'Meniu Quesadilla',
      en: '550 gr.',
      ingredients: 'piept  pui  100g,  ardei  gras  60g,  ceapă  40g,  roșie  50g,  mozzarella  50g,  lipie  tortilla, cartofi prăjiți 150gr, sos 90ml',
      price: '40 Lei'
    },
    {
      ro: 'Pui Crispy',
      en: '200 gr.',
      ingredients: 'Piept de pui 300g, ouă 1buc, pesmet 30g, sare 5g, boia dulce 5g, făină 10g (200g)',
      price: '22 Lei'
    },
    {
      ro: 'Pui Shanghai',
      en: '200 gr.',
      ingredients: 'piept pui 150g, salată coleslaw, ou, muștar, făină',
      price: '22 Lei'
    },
    {
      ro: 'Șnițel pui cu mix de semințe',
      en: '200 gr.',
      ingredients: 'piept pui 150g, salată coleslaw, ou, făină, mix semințe, panko',
      price: '22 Lei'
    },
    {
      ro: 'Șnițel de pui',
      en: '200 gr.',
      ingredients: 'carne pui 150g, salată coleslaw, ou, făină, panko',
      price: '22 Lei'
    },
    {
      ro: 'Șnițel de porc',
      en: '200 gr.',
      ingredients: 'carne porc 150g, salată coleslaw, ou, făină, panko',
      price: '22 Lei'
    },

    {
      ro: 'Șnițel gratinat pui/porc',
      en: '230 gr.',
      ingredients: 'carne 150g, mozzarella 50g, pomodorro 30g',
      price: '25 Lei'
    },
    {
      ro: 'Cașcaval pane',
      en: '150 gr.',
      ingredients: '',
      price: '20 Lei'
    },
    {
      ro: 'Măsline pane',
      en: '170 gr.',
      ingredients: '',
      price: '25 Lei'
    },
    {
      ro: 'Chilli Cheese',
      en: '170 gr.',
      ingredients: '',
      price: '25 Lei'
    },
    {
      ro: 'Fritto misto',
      en: '400 gr.',
      ingredients: 'mix de fructe de mare 200g, cartofi prăjiți 150g, sos',
      price: '50 Lei'
    },
    {
      ro: 'Creveți Lemon',
      en: '500 gr.',
      ingredients: 'cozi creveți 150g, sos pomodorro 120ml, unt 50g, roșii cherry 30g, lipie 150g',
      price: '55 Lei'
    },

  ],
  'Burgeri / Burgers': [
    {
      ro: 'Burger Lemon',
      en: '630 gr.',
      ingredients: 'chiflă brioșă 90g, palină carne vită 170g, roșie 30g, salată iceberg 20g, dulceață, ceapă, gorgonzola 30gr, bacon 15gr, sos 120g, cartofi prăjiți 150g',
      price: '40 Lei'
    },
    {
      ro: 'Burger Classic',
      en: '400 gr.',
      ingredients: 'chiflă brioșă 90g, palină carne vită 170g, roșie 30g, salată iceberg 20g, ceapă 30 g, bacon 15g, cheddar 20g, castravete murat 10g, sos 120g, cartofi prăjiți 150g',
      price: '38 Lei'
    },
    {
      ro: 'Egg Burger',
      en: '650 gr.',
      ingredients: 'chiflă brioșă 90g, palină carne vită 170g, ou, roșie 30g, salată iceberg 20g, ceapă 30g, bacon 15g, cheddar 20g, castravete murat 10g, sos 120g, cartofi prăjiți 150g',
      price: '40 Lei'
    },
    {
      ro: 'Chicken Burger',
      en: '650 gr.',
      ingredients: 'chiflă  brioșă  90g,  șnițel  pui  150g,  cheddar  20g,  roșie  30g,  ceapă  30g,  castravete murat 20g, bacon 15g, salată iceberg 20g, sos 120g, cartofi prăjiți 150g',
      price: '30 Lei'
    },
  ],

  'Pizza': [
    {
      ro: 'Pizza Casei',
      en: '750 gr.',
      ingredients: 'palină  220g,  sos  pomodorro  100ml,  mozzarella  120g,  cotto  60g,  salam  uscat  60g, ciuperci 60g, măsline 40g, ceapă 30g, jalapenos 30g, bacon 40g',
      price: '42 Lei'
    },
    {
      ro: 'Margherita',
      en: '400 gr.',
      ingredients: 'palină 220g, sos pomodorro 100ml, mozzarella 120g, busuioc proaspăt ',
      price: '30 Lei'
    },
    {
      ro: 'Prosciutto cotto',
      en: '350 gr.',
      ingredients: 'palină 220g, prosciutto cotto 100g, oregano, ulei de măsline',
      price: '35 Lei'
    },
    {
      ro: 'Prosciutto e Funghi',
      en: '500 gr.',
      ingredients: 'pălină 220g, sos pomodorro 100ml, mozzarella 120g, prosciutto cotto 100g, ciuperci 60g, ulei măsline, oregano',
      price: '37 Lei'
    },
    {
      ro: 'Quattro Staggioni',
      en: '680 gr.',
      ingredients: 'palină  220g,  sos  pomodorro  100ml,  mozzarella  120g,  prosciutto  cotto  60g, salam uscat 60g, ciuperci 60g, măsline 60g',
      price: '40 Lei'
    },
    {
      ro: 'Quattro Formaggi',
      en: '540 gr.',
      ingredients: 'palină 220g, mozzarella 120g, gorgonzola 60g, brie 60g, panna cuccina 50ml, parmezan 30g',
      price: '42 Lei'
    },
    {
      ro: 'Quattro Formaggi Fresh',
      en: '600 gr.',
      ingredients: 'palină  220g,  mozzarella  120g,  gorgonzola  60g,  brie  60g,  panna  cuccina  50ml, parmezan 30gr, roșii cherry, rucolla',
      price: '43 Lei'
    },
    {
      ro: 'Diavolla',
      en: '560 gr.',
      ingredients: 'palină 220g, sos pomodorro 100ml, mozzarella 120g, salam uscat 120g, ulei picant',
      price: '37 Lei'
    },
    {
      ro: 'Sallami',
      en: '560 gr.',
      ingredients: 'palină 220g, sos pomodorro 100ml, mozzarella 120g, salam uscat 120 g, oregano',
      price: '37 Lei'
    },
    {
      ro: 'Capricciosa',
      en: '650 gr.',
      ingredients: 'palină  220g,  sos  pomodorro  100ml,  mozzarella  120g,  cotto  80g,  carciofi  30  g, ciuperci 60g, măsline 40g',
      price: '40 Lei'
    },
    {
      ro: 'Pollo e funghi',
      en: '560 gr.',
      ingredients: 'palină 220g, sos pomodorro 100ml, mozzarella 120g, piept pui 80g, ciuperci 60 g, parmezan',
      price: '40 Lei'
    },
    {
      ro: 'Tonno e cipolla',
      en: '600 gr.',
      ingredients: 'palină 220g, sos pomodorro 100ml, mozzarella 120g, ton conservă 80g, ceapă roșie 30g, măsline 50g',
      price: '42 Lei'
    },
    {
      ro: 'Al Salmone',
      en: '600 gr.',
      ingredients: 'ăalină  220g,  sos  pomodorro  100ml,  mozzarella  120g,  somon  crud  uscat  80  g, măsline 40g, ceapă 30g, lămâie 20g',
      price: '42 Lei'
    }
  ],

    'Garnituri / Side Dishes': [
    {
      ro: 'Cartofi prăjiți',
      en: '150 gr.',
      ingredients: 'Cartofi, ulei, sare (150g)',
      price: '10 Lei'
    },
    {
      ro: 'Cartofi prăjiți cu brânză',
      en: '180 gr.',
      ingredients: '',
      price: '13 Lei'
    },
    {
      ro: 'Cartofi prăjiți cu parmezan și usturoi',
      en: '180 gr.',
      ingredients: '',
      price: '14 Lei'
    },
    {
      ro: 'Cartof copt cu unt',
      en: '160 gr.',
      ingredients: '',
      price: '13 Lei'
    },
    {
      ro: 'Piure de cartofi',
      en: '150 gr.',
      ingredients: '',
      price: '10 Lei'
    },
    {
      ro: 'Piure cu trufe',
      en: '170 gr.',
      ingredients: '',
      price: '15 Lei'
    },
    {
      ro: 'Varză călită',
      en: '250 gr.',
      ingredients: '',
      price: '20 Lei'
    },
    {
      ro: 'Fasole iahnie',
      en: '250 gr.',
      ingredients: '',
      price: '15 Lei'
    },
    {
      ro: 'Legume la grătar',
      en: '200 gr.',
      ingredients: 'dovlecel, vânătă, ceapă, ardei, ciuperci',
      price: '15 Lei'
    },
    {
      ro: 'Orez cu legume',
      en: '200 gr.',
      ingredients: 'orez 150g, ceapă 20g, dovlecel 20g, ardei kapia 20g, unt 10g, pătrunjel 5g, sare 2g',
      price: '12 Lei'
    },
    {
      ro: 'Orez cu unt',
      en: '200 gr.',
      ingredients: '',
      price: '12 Lei'
    },
    {
      ro: 'Mămăligă',
      en: '150 gr.',
      ingredients: '',
      price: '7 Lei'
    },
  ],

'Salate însoțire': [
    {
      ro: 'Salată asortată',
      en: '230 gr.',
      ingredients: 'roșii, castraveți, ceapă, ardei gras',
      price: '15 Lei'
    },
    {
      ro: 'Salată roșii',
      en: '200 gr.',
      ingredients: '',
      price: '15 Lei'
    },
    {
      ro: 'Salată asortată murături',
      en: '200 gr.',
      ingredients: '',
      price: '10 Lei'
    },
    {
      ro: 'Salată varză albă',
      en: '200 gr.',
      ingredients: 'varză, morcov, mărar',
      price: '10 Lei'
    },
    {
      ro: 'Salată coleslaw',
      en: '200 gr.',
      ingredients: 'varză albă, morcov, țelină, miere, smântână, maioneză ',
      price: '10 Lei'
    },
    {
      ro: 'Salată de ardei copt',
      en: '150 gr.',
      ingredients: 'ardei copt 150g, ulei, usturoi, oțet',
      price: '10 Lei'
    },
    {
      ro: 'Salată sfeclă',
      en: '150 gr.',
      ingredients: '',
      price: '10 Lei'
    },
    {
      ro: 'Salată verde',
      en: '150 gr.',
      ingredients: '',
      price: '12 Lei'
    }
],

  'Deserturi / Desserts': [
    {
      ro: 'Tort Tiramisu',
      en: '200 gr.',
      ingredients: '',
      price: '22 Lei'
    },
    {
      ro: 'Papanași cu dulceață afine/vișine/ciocolată',
      en: '450 gr.',
      ingredients: 'brânză vaci, ou, făină, zahăr, bicarbonat, smântână ',
      price: '22 Lei'
    },
    {
      ro: 'Lava cake cu înghețată',
      en: '300 gr.',
      ingredients: 'ciocolată, unt, ou, făină, zahăr',
      price: '25 Lei'
    },
    {
      ro: 'Desertul bucătarului',
      en: '350 gr.',
      ingredients: 'clătite, frișcă, mascarpone, zahăr, arome, finetti, înghețată, fructe',
      price: '20 Lei'
    },
    {
      ro: 'Clătite ',
      en: '200 gr.',
      ingredients: 'lapte, ou, făină, arome',
      price: '20 Lei'
    },
    {
      ro: 'Cheesecake Lemon',
      en: '300 gr.',
      ingredients: 'biscuiți, unt, mascarpone, frișcă, jeleu, arome',
      price: '25 Lei'
    },
    {
      ro: 'Înghețată diverse sortimente',
      en: '150 gr.',
      ingredients: '',
      price: '15 lei'
    }
  ],

  'Extra': [
      {
      ro: 'Focaccia simplă',
      en: '200 gr.',
      ingredients: '',
      price: '10 Lei'
    },
    {
      ro: 'Focaccia usturoi',
      en: '200 gr.',
      ingredients: '',
      price: '12 Lei'
    },
    {
      ro: 'Focaccia parmezan și usturoi',
      en: '200 gr.',
      ingredients: '',
      price: '15 Lei'
    },
    {
      ro: 'Pâine',
      en: '80 gr.',
      ingredients: '',
      price: '3 Lei'
    },
    {
      ro: 'Cremă usturoi',
      en: '90 gr',
      ingredients: 'maioneză, usturoi',
      price: '5 Lei'
    },
    {
      ro: 'Sweet Chilli',
      en: '60 gr',
      ingredients: '',
      price: '5 Lei'
    },
    {
      ro: 'Mujdei usturoi',
      en: '90 gr.',
      ingredients: '',
      price: '5 Lei'
    },
    {
      ro: 'Muștar',
      en: '70 gr.',
      ingredients: '',
      price: '3 Lei'
    },
    {
      ro: 'Sosul casei',
      en: '90 gr.',
      ingredients: 'Sosul casei (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Sos Pomodorro',
      en: '90 gr.',
      ingredients: '',
      price: '5 Lei'
    },
    {
      ro: 'Maioneză',
      en: '90 gr.',
      ingredients: '',
      price: '5 Lei'
    },
    {
      ro: 'Maioneză picantă',
      en: '90 gr.',
      ingredients: '',
      price: '5 Lei'
    },
    {
      ro: 'Smântână',
      en: '90 gr.',
      ingredients: '',
      price: '5 Lei'
    },
    {
      ro: 'Topping parmezan',
      en: '',
      ingredients: '',
      price: '5 Lei'
    },
    {
      ro: 'Ardei iute',
      en: '',
      ingredients: '',
      price: '3 Lei'
    },
    {
      ro: 'Pachet',
      en: '',
      ingredients: '',
      price: '2 Lei'
    },
  ],

  'Whisky': [
    {
      ro: 'Chivas Regal 12 ani',
      en: 'Chivas Regal 12 Years Whisky',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Jameson Irish',
      en: 'Jameson Irish Whiskey',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Four Roses',
      en: 'Four Roses Bourbon',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Glenlivet 12 ani',
      en: 'Glenlivet 12 Years',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Chivas Regal Royal Salute 21 ani',
      en: 'Chivas Regal Royal Salute 21 Years',
      ingredients: '40ml',
      price: '15 Lei'
    },
  ],

  'Rom': [

    {
      ro: 'Rom Havana Club 3 ani',
      en: 'Havana Club 3 Years Rum',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Havana Club Cuban Spiced',
      en: 'Havana Club Cuban Spiced',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Bumbu Original',
      en: 'Bumbu Original Rum',
      ingredients: '40ml',
      price: '15 Lei'
    },
  ],

  'Vodka': [
    {
      ro: 'Vodka Absolut',
      en: 'Absolut Vodka',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Ostoya Black',
      en: 'Ostoya Black Vodka',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Belvedere',
      en: 'Belvedere Vodka',
      ingredients: '40ml',
      price: '25 Lei'
    },
  ],

  'Liquor': [
    {
      ro: 'Liquor Carolans Irish Cream',
      en: 'Carolans Irish Cream',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Ramazzotti Sambuca',
      en: 'Ramazzotti Sambuca',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Ramazzotti Amaro',
      en: 'Ramazzotti Amaro',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Kahlua',
      en: 'Kahlua',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Malibu',
      en: 'Malibu',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'De Kuyper Triple Sec',
      en: 'De Kuyper Triple Sec',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'De Kuyper Peachtree',
      en: 'De Kuyper Peachtree',
      ingredients: '40ml',
      price: '12 Lei'
    },
  ],

  'Tequila': [
    {
      ro: 'Olmeca Altos Blanco',
      en: '',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Olmeca Altos Reposado',
      en: 'Olmeca Altos Reposado',
      ingredients: '40ml',
      price: '15 Lei'
    },
  ],

  'Tradiționale': [

    {
      ro: 'Tradiționale Vișinată',
      en: 'Traditional Cherry Brandy',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Afinată',
      en: 'Blueberry Brandy',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Pălincă de Prune',
      en: 'Plum Brandy',
      ingredients: '40ml',
      price: '15 Lei'
    },
  ],

  'Gin & Tonic': [

    {
      ro: 'Malfy Rosa',
      en: 'Malfy Rosa Gin',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Malfy Limone',
      en: 'Malfy Limone Gin',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Malfy Original',
      en: 'Malfy Original Gin',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Ceder\'s Pink Rose 0%',
      en: 'Ceder\'s Pink Rose Non-Alcoholic',
      ingredients: '40ml',
      price: '10 Lei'
    },
  ],

  'Vermouth': [  
    {
      ro: 'St. Petroni Blanco',
      en: '',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'St. Petroni Rojo',
      en: '',
      ingredients: '40ml',
      price: '15 Lei'
    },
  ],

   'Cognac': [  

    {
      ro: 'Cognac Ararat 5 Ani',
      en: 'Ararat 5 Years Cognac',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Martell',
      en: 'Martell Cognac',
      ingredients: '40ml',
      price: '25 Lei'
    }
  ],

   'Cocktailuri': [  

    {
      ro: 'Hugo',
      en: '',
      ingredients: 'Lime, mentă, prosecco, sirop de soc, apă minerală (250ml)',
      price: '8 Lei'
    },
    {
      ro: 'Cuba Libre',
      en: '',
      ingredients: 'Havana Club 3 ani, Coca Cola, lime, gheață',
      price: '12 Lei'
    },
    {
      ro: 'Aperol Spritz',
      en: '',
      ingredients: 'St. Petroni Aperitivo, prosecco, apă minerală',
      price: '14 Lei'
    }
  ],

  'Limonade & Fresh': [
    {
      ro: 'Limonadă clasică',
      en: 'Classic Lemonade',
      ingredients: 'Limonadă clasică (200ml)',
      price: '15 Lei'
    },
    {
      ro: 'Limonadă cu grapefruit',
      en: 'Grapefruit Lemonade',
      ingredients: 'Limonadă cu grapefruit (200ml)',
      price: '15 Lei'
    },
    {
      ro: 'Limonadă cu portocale',
      en: 'Orange Lemonade',
      ingredients: 'Limonadă cu portocale (200ml)',
      price: '15 Lei'
    },
    {
      ro: 'Limonadă cu zmeură',
      en: 'Raspberry Lemonade',
      ingredients: 'Limonadă cu zmeură (200ml)',
      price: '15 Lei'
    }
  ],

  'Vinuri Roșii': [
    {
      ro: 'Cuvee Uberland',
      en: 'Red Wines - Cuvee Uberland',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Recas Selene',
      en: 'Recas Selene',
      ingredients: '0.75L',
      price: '150 Lei'
    },
    {
      ro: 'Liliac Cuvee',
      en: 'Liliac Cuvee',
      ingredients: '0.75L',
      price: '120 Lei'
    },
    {
      ro: 'Caii de la Letea Vol. II Cabernet Sauvignon',
      en: 'Caii de la Letea Vol. II Cabernet Sauvignon',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Nocturne',
      en: 'Nocturne',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Arrogance',
      en: 'Arrogance',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'La Plage',
      en: 'La Plage',
      ingredients: '0.75L',
      price: '75 Lei'
    },
  ],

   'Vinuri Albe': [

    {
      ro: 'Solo Quinta',
      en: 'Solo Quinta',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Nocturne',
      en: 'Nocturne',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Caii de la Letea Vol. II',
      en: 'Caii de la Letea Vol. II',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Liliac',
      en: 'Liliac',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Alb de Starmina',
      en: 'Alb de Starmina',
      ingredients: '0.75L',
      price: '90 Lei'
    },
    {
      ro: 'Arrogance',
      en: 'Arrogance',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Recas Sole',
      en: 'Recas Sole',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Pinot Gris',
      en: 'Pinot Gris',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'La Plage',
      en: 'La Plage',
      ingredients: '0.75L',
      price: '75 Lei'
    },
  ],

   'Vinuri Roze': [

    {
      ro: 'Solo Quinta',
      en: 'Solo Quinta',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Roza de Samburesti',
      en: 'Roza de Samburesti',
      ingredients: '0.75L',
      price: '90 Lei'
    },
    {
      ro: 'Rozalia',
      en: 'Rozalia',
      ingredients: '0.75L',
      price: '90 Lei'
    },
    {
      ro: 'Arrogance',
      en: 'Arrogance',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Rasova Sur Mer',
      en: 'Rasova Sur Mer',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Nocturne',
      en: 'Nocturne',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Caii de la Letea Volumul II',
      en: 'Caii de la Letea Volume II',
      ingredients: '0.75L',
      price: '110 Lei'
    },
  ],

   'Șampanie / Prosecco': [
    {
      ro: 'Prince Laurent',
      en: 'Prince Laurent',
      ingredients: '0.75L',
      price: '250 Lei'
    },
    {
      ro: 'Cuvee de Purcari',
      en: 'Cuvee de Purcari',
      ingredients: '0.75L',
      price: '250 Lei'
    },
    {
      ro: 'Cuvee de Purcari Roze',
      en: 'Cuvee de Purcari Rosé',
      ingredients: '0.75L',
      price: '250 Lei'
    },
    {
      ro: 'Prosecco Visconti della Roccia',
      en: 'Prosecco Visconti della Roccia',
      ingredients: '0.75L',
      price: '90 Lei'
    }
  ],
  'Bere / Beer': [
    {
      ro: 'Staropramen',
      en: 'Staropramen',
      ingredients: '330ml',
      price: '10 Lei'
    },
    {
      ro: 'Stella Artois',
      en: 'Stella Artois',
      ingredients: '330ml',
      price: '12 Lei'
    },
    {
      ro: 'Stella Artois N/A',
      en: 'Stella Artois Non-Alcoholic',
      ingredients: '330ml',
      price: '14 Lei'
    },
    {
      ro: 'Madri',
      en: 'Madri',
      ingredients: '330ml',
      price: '12 Lei'
    },
    {
      ro: 'Corona',
      en: 'Corona',
      ingredients: '330ml',
      price: '20 Lei'
    },
    {
      ro: 'Miller',
      en: 'Miller',
      ingredients: '330ml',
      price: '13 Lei'
    }
  ],
  'Soft Drinks': [
    {
      ro: '7-Up',
      en: '7-Up',
      ingredients: '0.25L',
      price: '8 Lei'
    },
    {
      ro: 'Everess',
      en: 'Everess',
      ingredients: '0.25L',
      price: '8 Lei'
    },
    {
      ro: 'Cappy Pulpy de Portocale',
      en: 'Cappy Pulpy Orange',
      ingredients: '0.25L',
      price: '10 Lei'
    },
    {
      ro: 'Cappy Pulpy de Piersică',
      en: 'Cappy Pulpy Peach',
      ingredients: '0.25L',
      price: '10 Lei'
    },
    {
      ro: 'Mirinda',
      en: 'Mirinda',
      ingredients: '0.25L',
      price: '8 Lei'
    },
    {
      ro: 'Pepsi',
      en: 'Pepsi',
      ingredients: '0.25L / 0.50L',
      price: '8 Lei / 12 Lei'
    },
    {
      ro: 'Pepsi Max',
      en: 'Pepsi Max',
      ingredients: '0.50L',
      price: '12 Lei'
    },
    {
      ro: 'Bucovina Apă Plată',
      en: 'Bucovina Still Water',
      ingredients: '0.33L / 0.70L',
      price: '7 Lei / 10 Lei'
    },
    {
      ro: 'Bucovina Apă Minerală',
      en: 'Bucovina Mineral Water',
      ingredients: '0.33L / 0.70L',
      price: '7 Lei / 11 Lei'
    }
  ],
  'Cafea / Coffee': [
    {
      ro: 'Espresso',
      en: 'Espresso',
      ingredients: '40ml',
      price: '8 Lei'
    },
    {
      ro: 'Espresso Doppio',
      en: 'Double Espresso',
      ingredients: '80ml',
      price: '12 Lei'
    },
    {
      ro: 'Cappuccino',
      en: 'Cappuccino',
      ingredients: '190ml',
      price: '14 Lei'
    },
    {
      ro: 'Caffe Latte',
      en: 'Caffe Latte',
      ingredients: '190ml',
      price: '14 Lei'
    },
    {
      ro: 'Americano',
      en: 'Americano',
      ingredients: '120ml',
      price: '13 Lei'
    },
    {
      ro: 'Americano cu Lapte',
      en: 'Americano with Milk',
      ingredients: '140ml',
      price: '14 Lei'
    }
  ],
  'Ceai / Tea': [
    {
      ro: 'Ceai Julius Meinl cu Mentă',
      en: 'Julius Meinl Mint Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Cirese și Rodie',
      en: 'Cherry and Pomegranate Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Simfonia Fructelor',
      en: 'Fruit Symphony Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Esență de Plante Alpine',
      en: 'Alpine Herbs Essence Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Green Jasmine Chung Hao',
      en: 'Green Jasmine Chung Hao Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Ceai Julius Meinl Camomilă',
      en: 'Julius Meinl Chamomile Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Strudel cu Mere',
      en: 'Apple Strudel Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Ghimbir cu Iarbă de Lămâie',
      en: 'Ginger with Lemongrass Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Ceai Julius Meinl Gray Blossom',
      en: 'Julius Meinl Gray Blossom Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Căpșuni cu Mentă',
      en: 'Strawberry with Mint Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Chun Mee Organic',
      en: 'Chun Mee Organic Tea',
      ingredients: '200ml',
      price: '15 Lei'
    }
  ]
};

const MenuItem = ({ item, index }: { item: { ro: string; en: string; ingredients: string; price: string }; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: '-50vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '50vw' }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="menu-card p-2 rounded-lg mb-2 transform w-full"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden rounded-lg bg-white bg-opacity-95 p-3 w-full text-left transition-all hover:bg-opacity-100 hover:shadow-md"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-semibold text-gray-800 leading-tight pr-2">{item.ro}</h3>
              {item.price && (
                <span className="text-base font-bold text-yellow-600 flex-shrink-0">{item.price}</span>
              )}
            </div>
            <p className="text-xs text-gray-600 italic leading-tight">{item.en}</p>
          </div>
          {item.ingredients && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-yellow-500 ml-2 flex-shrink-0"
            >
              <ChevronDown size={16} />
            </motion.div>
          )}
        </div>
        
        <AnimatePresence>
          {isOpen && item.ingredients && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 mt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.ingredients}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="h-0.5 w-8 bg-yellow-400 rounded-full mt-2" />
      </button>
    </motion.div>
  );
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(menuCategories)[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen pt-16 px-2 pb-16 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 mb-2 sm:mb-4">Meniul Nostru</h1>
          <p className="text-lg sm:text-xl text-gray-600 font-serif italic px-4">Dacă papilele tale gustative ar putea dansa, aici ar face-o</p>
        </motion.div>
        
        {/* Mobile-optimized category selector */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Categorii</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          
          {/* Grid view for categories */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {Object.keys(menuCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category); categoryRefs.current[category]?.scrollIntoView({behavior: "smooth", block: "start"});}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="line-clamp-2">
                    {category}
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    {menuCategories[category as keyof typeof menuCategories].length} items
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* List view for categories */
            <div className="space-y-1">
              {Object.keys(menuCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left flex justify-between items-center ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 shadow-sm'
                  }`}
                >
                  <span>{category}</span>
                  <span className="text-xs opacity-75">
                    {menuCategories[category as keyof typeof menuCategories].length}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu items */}
        <div className="relative">
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-semibold text-gray-800 mb-1">{selectedCategory}</h3>
            <p className="text-sm text-gray-600">
              {menuCategories[selectedCategory as keyof typeof menuCategories].length} preparate disponibile
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
            >
              {menuCategories[selectedCategory as keyof typeof menuCategories].map((item, index) => (
                <MenuItem 
                  key={item.ro} 
                  item={item} 
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom fade effect */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none -z-10" />
    </div>
  );
}

export default Menu;
