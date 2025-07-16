"use client";

import { motion } from "framer-motion";
import FooterV2 from "@/components/new/Footer";
import { Shield, User, Phone, Mail, Clock, FileText } from "lucide-react";
import "../../app/globals.css";
const PrivacyPolicyPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-16 bg-primary overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/5 blur-2xl animate-pulse delay-300" />
          <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-pulse delay-700" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-4">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Trasparenza e Privacy</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Privacy Policy
              </h1>

              <p className="text-base md:text-lg text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
                Informazioni sul trattamento dei dati personali secondo il
                Regolamento UE 2016/679 (GDPR)
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-200"
              >
                {/* Aggiornamento */}
                <div className="flex items-center gap-3 mb-8 p-4 bg-primary/10 rounded-xl border border-primary/20">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-primary">
                      Ultimo aggiornamento:{" "}
                      {new Date().toLocaleDateString("it-IT")}
                    </p>
                    <p className="text-xs text-primary/80">
                      La presente informativa è aggiornata al GDPR (Regolamento
                      UE 2016/679)
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* 1. Titolare del trattamento */}
                  <section className="border-l-4 border-primary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <User className="w-6 h-6 text-primary" />
                      1. Titolare del Trattamento
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        <strong>Azienda Agricola Il Pichello</strong>
                      </p>
                      <p>Titolare: Mirco Pizzino</p>
                      <p>
                        Sede legale: Via Dante Alighieri 141, 42033 Marola,
                        Carpineti (RE)
                      </p>
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:info@agricolailpichello.it"
                          className="text-primary hover:underline"
                        >
                          info@agricolailpichello.it
                        </a>
                      </p>
                      <p>
                        Telefono:{" "}
                        <a
                          href="tel:3408200080"
                          className="text-primary hover:underline"
                        >
                          340/8200080
                        </a>
                      </p>
                    </div>
                  </section>

                  {/* 2. Dati raccolti */}
                  <section className="border-l-4 border-secondary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-secondary" />
                      2. Dati Personali Raccolti
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Attraverso il modulo di contatto del nostro sito web
                        raccogliamo esclusivamente:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>Nome e cognome</strong> - per identificare chi
                          ci contatta
                        </li>
                        <li>
                          <strong>Numero di telefono</strong> - per
                          ricontattarti telefonicamente
                        </li>
                        <li>
                          <strong>Indirizzo email</strong> - per rispondere via
                          email
                        </li>
                        <li>
                          <strong>Messaggio</strong> - per comprendere la tua
                          richiesta
                        </li>
                      </ul>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg border">
                        <strong>Nota:</strong> Il conferimento di questi dati è
                        facoltativo, ma necessario per permetterci di rispondere
                        alle tue richieste.
                      </p>
                    </div>
                  </section>

                  {/* 3. Finalità del trattamento */}
                  <section className="border-l-4 border-primary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <Mail className="w-6 h-6 text-primary" />
                      3. Finalità del Trattamento
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        I tuoi dati personali vengono utilizzati{" "}
                        <strong>esclusivamente</strong> per:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          Rispondere alle tue richieste di informazioni sui
                          nostri prodotti
                        </li>
                        <li>Gestire eventuali ordini o prenotazioni</li>
                        <li>Fornirti assistenza e supporto clienti</li>
                        <li>
                          Ricontattarti tramite telefono o email per finalizzare
                          la tua richiesta
                        </li>
                      </ul>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
                        <p className="text-green-800 font-medium">
                          ✓ Non utilizziamo i tuoi dati per attività di
                          marketing automatizzato
                        </p>
                        <p className="text-green-800 font-medium">
                          ✓ Non condiviamo i tuoi dati con terze parti
                        </p>
                        <p className="text-green-800 font-medium">
                          ✓ Non ti invieremo comunicazioni commerciali non
                          richieste
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 4. Base giuridica */}
                  <section className="border-l-4 border-secondary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      4. Base Giuridica del Trattamento
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>Il trattamento dei tuoi dati si basa su:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>Consenso</strong> (art. 6, par. 1, lett. a
                          GDPR) - fornito quando compili il modulo di contatto
                        </li>
                        <li>
                          <strong>Interesse legittimo</strong> (art. 6, par. 1,
                          lett. f GDPR) - per rispondere alle richieste
                          commerciali e di informazioni
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 5. Conservazione */}
                  <section className="border-l-4 border-primary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <Clock className="w-6 h-6 text-primary" />
                      5. Conservazione dei Dati
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>I tuoi dati personali vengono conservati per:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>24 mesi</strong> dalla data della richiesta
                          per gestire eventuali comunicazioni successive
                        </li>
                        <li>
                          Decorso questo periodo, i dati vengono automaticamente
                          cancellati
                        </li>
                        <li>
                          Puoi richiedere la cancellazione anticipata in
                          qualsiasi momento
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 6. Diritti dell'interessato */}
                  <section className="border-l-4 border-secondary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      6. I Tuoi Diritti
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>Secondo il GDPR, hai il diritto di:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900">
                            Accesso
                          </h4>
                          <p className="text-sm">
                            Sapere quali dati abbiamo su di te
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900">
                            Rettifica
                          </h4>
                          <p className="text-sm">Correggere dati inesatti</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900">
                            Cancellazione
                          </h4>
                          <p className="text-sm">
                            Richiedere la rimozione dei dati
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900">
                            Portabilità
                          </h4>
                          <p className="text-sm">
                            Ricevere i tuoi dati in formato strutturato
                          </p>
                        </div>
                      </div>
                      <p className="mt-4">
                        Per esercitare questi diritti, contattaci all'indirizzo{" "}
                        <a
                          href="mailto:info@agricolailpichello.it"
                          className="text-primary hover:underline font-medium"
                        >
                          info@agricolailpichello.it
                        </a>
                      </p>
                    </div>
                  </section>

                  {/* 7. Modalità di Trattamento e Servizi Terzi */}
                  <section className="border-l-4 border-primary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <Shield className="w-6 h-6 text-primary" />
                      7. Modalità di Trattamento e Servizi Terzi (Formcarry)
                    </h2>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        I dati sono trattati con strumenti informatici sicuri e
                        protetti.
                      </p>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Gestione Tecnica tramite Formcarry
                        </h4>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          Per la gestione tecnica dell'invio e della ricezione
                          dei messaggi tramite il form di contatto, ci avvaliamo
                          del servizio di terze parti <strong>Formcarry</strong>
                          . Quando invii il modulo, i dati vengono trasmessi ai
                          server di Formcarry per essere processati e recapitati
                          a noi.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <p>
                          <strong>Ruolo di Formcarry:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>
                            Formcarry agisce come{" "}
                            <strong>responsabile del trattamento</strong>{" "}
                            limitatamente agli aspetti tecnici della
                            trasmissione
                          </li>
                          <li>
                            I dati non saranno diffusi né comunicati a terzi al
                            di fuori di quanto strettamente necessario per la
                            gestione tecnica dell'invio
                          </li>
                          <li>
                            Ti invitiamo a consultare la{" "}
                            <a
                              href="https://formcarry.com/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline font-medium"
                            >
                              Privacy Policy di Formcarry
                            </a>{" "}
                            per maggiori dettagli su come trattano i dati
                          </li>
                        </ul>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-green-800 font-medium text-sm">
                          ✓ Formcarry è utilizzato esclusivamente per la
                          trasmissione tecnica sicura dei messaggi
                        </p>
                        <p className="text-green-800 font-medium text-sm">
                          ✓ I tuoi dati vengono recapitati direttamente a noi
                          senza essere utilizzati per altri scopi
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* 8. Sicurezza */}
                  <section className="border-l-4 border-secondary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <Shield className="w-6 h-6 text-secondary" />
                      8. Sicurezza dei Dati
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Adottiamo misure tecniche e organizzative appropriate
                        per proteggere i tuoi dati personali:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Trasmissione sicura tramite protocollo HTTPS</li>
                        <li>
                          Utilizzo di servizi certificati come Formcarry per la
                          gestione sicura dei form
                        </li>
                        <li>
                          Accesso limitato ai dati solo al personale autorizzato
                        </li>
                        <li>
                          Backup regolari e sistemi di sicurezza aggiornati
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 9. Cookie */}
                  <section className="border-l-4 border-primary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      9. Cookie e Tecnologie Simili
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>Il nostro sito utilizza esclusivamente:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong>Cookie tecnici necessari</strong> per il
                          funzionamento del sito
                        </li>
                        <li>
                          Non utilizziamo cookie di profilazione o di
                          tracciamento
                        </li>
                        <li>
                          Non condividiamo dati con piattaforme di terze parti
                          per finalità pubblicitarie
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* 10. Modifiche */}
                  <section className="border-l-4 border-secondary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      10. Modifiche alla Privacy Policy
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Ci riserviamo il diritto di modificare questa privacy
                        policy. Le modifiche saranno pubblicate su questa pagina
                        con indicazione della data di aggiornamento.
                      </p>
                    </div>
                  </section>

                  {/* 11. Contatti */}
                  <section className="border-l-4 border-primary pl-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <Phone className="w-6 h-6 text-primary" />
                      11. Contatti per la Privacy
                    </h2>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Per qualsiasi domanda riguardo al trattamento dei tuoi
                        dati personali puoi contattarci:
                      </p>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                        <p>
                          <strong>Email:</strong>{" "}
                          <a
                            href="mailto:info@agricolailpichello.it"
                            className="text-primary hover:underline"
                          >
                            info@agricolailpichello.it
                          </a>
                        </p>
                        <p>
                          <strong>Telefono:</strong>{" "}
                          <a
                            href="tel:3408200080"
                            className="text-primary hover:underline"
                          >
                            340/8200080
                          </a>
                        </p>
                        <p>
                          <strong>Indirizzo:</strong> Via Dante Alighieri 141,
                          42033 Marola, Carpineti (RE)
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Hai anche il diritto di presentare reclamo al Garante
                        per la Protezione dei Dati Personali se ritieni che il
                        trattamento dei tuoi dati non sia conforme alla
                        normativa vigente.
                      </p>
                    </div>
                  </section>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <FooterV2 />
    </>
  );
};

export default PrivacyPolicyPage;
