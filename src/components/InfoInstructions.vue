<template>
  <div>
    <div class="article-title">Instruktioner</div>
    <div class="article">
      <p>
        Ange ett eller flera <strong>sökord</strong> i sökfältet. Om flera ord
        anges sker en sökning på varje ord för sig. I det förvalda sökläget
        <em>Fulltextsökning</em> sker sökning på ord som förekommer inom alla
        uppslagstexterna. Välj <em>Uppslagsord</em> för att endast söka inom ett
        specifikt <em>uppslagsord</em>.
      </p>
      <p>
        <strong>Sökresultaten</strong> visas sida vid sida om webbläsarfönstret
        är tillräckligt stort. I annat fall visas en utgåva i taget, med en
        knapp för att växla mellan dem. Notera att ett flertal uppslagsord har
        flera ingångar, dels för att särskilja olika betydelser men också för
        att korrigeringar i supplementband räknas upp separat.
      </p>
      <p>
        Genom att klicka på ett sökresultat kommer du till det relevanta
        uppslagsordet i sin helhet. Texten ackompanjeras av
        <strong>sidhänvisningar</strong>, <strong>faksimiler</strong> från det
        tryckta verket och ren text för nedladdning. Sidhänvisningarna och
        faksimilsammanställningarna skiljer tyvärr inte mellan de olika
        ingångarna för ett givet uppslagsord.
      </p>
      <p>
        Utöver sökresultaten visas för varje sökord till vänster om resultaten
        en lista över <strong>relaterade ord</strong>. Det är en sammanställning
        som utgår från hela respektive utgåva som en separat textkorpus för att
        hitta ord som är relaterade till sökordet. Siffrorna anger de relaterade
        ordens likheten i en Word2Vec-modell, vilket innebär att ord betraktas
        som lika om de förekommer i liknande lexikala sammanhang.
      </p>
    </div>
  </div>
</template>
