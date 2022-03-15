export default class ExerciseLevel {

    public static ex = { 
        flexoes: 0,
        abdominais: 0,
        prancha: 0,
        polichinelo: 0,
        agachamento: 0
    };

    public setExerciseLevel(lvl: number) {
        ExerciseLevel.ex = {
            flexoes: 3 * lvl,
            abdominais: 5 * lvl,
            prancha: 0.25 * lvl,
            polichinelo: 10 * lvl,
            agachamento: 5 * lvl
        }
    }
}