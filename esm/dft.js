import { ComplexNumber } from "https://dirkarnez.github.io/complex-number-calculator/esm/complex-number.js";

export const DFT_Equation = array => {
    // k
    return array.map((_, k) => {
        // summation
        return array.reduce((p, signalValue, n) => {
            const complexNumber = new ComplexNumber();
            // console.log(`k = ${k}, ${(-1 * 2 * Math.PI * n * k) / array.length}, ${(-1 * 2 * n * k) / array.length}`)
            // complexNumber.setExponentialForm(signalValue, (-1 * 2 * Math.PI * n * k) / array.length);

            complexNumber.setExponentialFormWithPI(signalValue, (-1 * 2 * n * k) / array.length);
            return p.add(complexNumber);
        }, new ComplexNumber());
    })
};

export const DFT = (array, sampleRate) => {
    const isEven = num => num % 2 == 0;
    // if N is odd => ceil(N / 2)
    // if N is even => (N/2) + 1

    const kCount = isEven(array.length) ? (array.length / 2) + 1 : Math.ceil(array.length / 2);
    return DFT_Equation(array)
    .slice(0, kCount)
    .map((complexNumber, k) => {
        const amplitude = complexNumber.multiplyWithScalar(2).amplitude() / array.length;
        const hz = k * (sampleRate / array.length);
        console.log(`k = ${k}, freq = ${hz}Hz, amplitude = ${amplitude}, Rectangular Form: ${complexNumber.toString()}, Polar Form: ${complexNumber.convertToPolarForm()}`);
        return { amplitude, hz };
    });
}
