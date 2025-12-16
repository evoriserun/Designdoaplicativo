import svgPaths from "./svg-x5tyicock6";

function App() {
  return <div className="absolute bg-white h-[851.898px] left-0 top-0 w-[393.851px]" data-name="App" />;
}

function Heading() {
  return (
    <div className="absolute content-stretch flex h-[31.962px] items-start left-0 top-0 w-[345.867px]" data-name="Heading 2">
      <p className="basis-0 font-['Arial:Bold',sans-serif] grow leading-[32px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[24px] text-center">Teste de 1600m</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[39.96px] left-[12.93px] top-[39.96px] w-[319.977px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[160.28px] not-italic text-[#4a5565] text-[14px] text-center top-[-2px] translate-x-[-50%] w-[287px]">Corra 1,6 km o mais rápido possível. Este é um teste de performance - dê o seu melhor!</p>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[79.92px] left-[23.99px] top-[336.3px] w-[345.867px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[23.992px] relative shrink-0 w-[129.341px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[23.992px] items-start relative w-[129.341px]">
        <p className="font-['Arial:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-center text-nowrap whitespace-pre">Distância do teste</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[28.004px] relative shrink-0 w-[63.41px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[28.004px] items-start relative w-[63.41px]">
        <p className="font-['Arial:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] text-center text-nowrap whitespace-pre">1,6 km</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[28.004px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[28.004px] items-center justify-between relative w-full">
          <Text />
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-gray-50 content-stretch flex flex-col h-[79.459px] items-start left-[23.99px] pb-[1.735px] pt-[25.727px] px-[25.727px] rounded-[16px] top-[448.21px] w-[345.867px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.735px] border-gray-100 border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[23.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p35526e80} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99935" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[27.977px] relative shrink-0 w-[122.238px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[27.977px] relative w-[122.238px]">
        <p className="absolute font-['Arial:Bold',sans-serif] leading-[28px] left-[61.5px] not-italic text-[18px] text-center text-nowrap text-white top-[-1.26px] translate-x-[-50%] whitespace-pre">INICIAR TESTE</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#e53935] content-stretch flex gap-[11.983px] h-[67.937px] items-center justify-center left-[23.99px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(251,44,54,0.2),0px_4px_6px_-4px_rgba(251,44,54,0.2)] top-[575.65px] w-[345.867px]" data-name="Button">
      <Icon />
      <Text2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[47.984px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d="M19.9935 3.9987H27.9909" id="Vector" stroke="var(--stroke-0, #E53935)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.9987" />
          <path d={svgPaths.p6e8ab80} id="Vector_2" stroke="var(--stroke-0, #E53935)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.9987" />
          <path d={svgPaths.pddeda40} id="Vector_3" stroke="var(--stroke-0, #E53935)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.9987" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-red-50 content-stretch flex items-center justify-center left-[148.91px] pl-0 pr-[0.027px] py-0 rounded-[5.82178e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[95.996px] top-[208.31px]" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Test1600Tracking() {
  return (
    <div className="absolute bg-white h-[851.898px] left-0 top-0 w-[393.851px]" data-name="Test1600Tracking">
      <Container />
      <Container2 />
      <Button />
      <Container3 />
    </div>
  );
}

export default function DesignDoAplicativoEvorise() {
  return (
    <div className="bg-white relative size-full" data-name="Design do Aplicativo EVORISE">
      <App />
      <Test1600Tracking />
    </div>
  );
}