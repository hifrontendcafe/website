interface MentorStepProps {
    number: number;
    textStep: string;
}

const evenStep = {
    container: 'relative flex items-center w-64 md:w-96 h-24 bg-primary px-6 my-6 mr-16 md:mr-0 rounded-bl-full rounded-tl-full',
    circle: 'absolute -right-16 -top-2.5 w-28 h-28 bg-white rounded-full font-sans font-black align-middle text-center',
    step: 'text-primary text-7xl m-0',
    text: 'w-48 md:w-72 pl-2 text-xs text-white font-semibold font-sans leading-4'
}

const oddStep = {
    container: 'relative flex justify-end items-center w-64 md:w-96 h-24 bg-white px-2 md:px-6 my-6 ml-14 md:ml-0 rounded-br-full rounded-tr-full',
    circle: 'absolute -left-14 -top-2.5 w-28 h-28 bg-primary rounded-full font-sans font-black align-middle text-center',
    step: 'text-white text-7xl m-0',
    text: 'w-48 md:w-72 pl-1 text-xs text-blue-900 font-semibold font-sans leading-4'
}

const MentorshipStep: React.FC<MentorStepProps> = ({ number, textStep }) => {
    const isEven = number % 2 === 0
    return (
        <div className={isEven ? evenStep.container : oddStep.container}
            style={{boxShadow: '0 0 15px 2px rgba(0, 0, 0, 0.1)'}}>
            <div className={isEven ? evenStep.circle : oddStep.circle}>
                <span className={isEven ? evenStep.step : oddStep.step}>
                    {number}
                </span>
            </div>
            <p className={isEven ? evenStep.text : oddStep.text}>
                {textStep} 
            </p>
        </div>
    )
}

export default MentorshipStep;