interface MentorStepProps {
    number: number;
    textStep: string;
}

const evenStep = {
    container: 'relative flex items-center w-96 h-24 bg-green-400 px-6 my-6 ml-20 rounded-bl-full rounded-tl-full',
    circle: 'absolute -right-16 -top-2.5 w-28 h-28 bg-white rounded-full font-bold align-middle text-center',
    step: 'text-green-400 text-7xl m-0',
    text: 'w-72 pl-2 text-xs text-white font-semibold'
}

const oddStep = {
    container: 'relative flex justify-end items-center w-96 h-24 bg-white px-6 ml-14 my-6 rounded-br-full rounded-tr-full',
    circle: 'absolute -left-14 -top-2.5 w-28 h-28 bg-green-400 rounded-full font-bold align-middle text-center',
    step: 'text-white text-7xl m-0',
    text: 'w-72 pl-2 text-xs text-blue-900 font-semibold'
}

const MentorshipStep: React.FC<MentorStepProps> = ({ number, textStep }) => {
    const isEven = number % 2 === 0 ? true : false
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