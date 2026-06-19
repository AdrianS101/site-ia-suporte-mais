import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { Clientes } from '../../components/clientes/clientes';
import { Problema } from '../../components/problema/problema';
import { ComoResolve } from '../../components/como-resolve/como-resolve';
import { TresPilares } from '../../components/tres-pilares/tres-pilares';
import { Features } from '../../components/features/features';
import { Benefits } from '../../components/benefits/benefits';
import { Seguranca } from '../../components/seguranca/seguranca';
import { SuccessCases } from '../../components/success-cases/success-cases';
import { Faq } from '../../components/faq/faq';
import { CtaFinal } from '../../components/cta-final/cta-final';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Hero,
    Clientes,
    Problema,
    ComoResolve,
    TresPilares,
    Features,
    Benefits,
    Seguranca,
    SuccessCases,
    Faq,
    CtaFinal,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  title = 'IA HelpDesk+ - O sistema de chamados com IA de copiloto';
}
