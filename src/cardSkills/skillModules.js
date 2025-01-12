// ELVES
import { elvesLvl1 } from "./houses-of-elves/level_1"
import { elvesLvl2 } from "./houses-of-elves/level_2"
import { elvesLvl3 } from "./houses-of-elves/level_3"
import { elvesLvl4 } from "./houses-of-elves/level_4"
import { elvesLvl5 } from "./houses-of-elves/level_5"
import { elvesLvl6 } from "./houses-of-elves/level_6"
import { elvesLvl7 } from "./houses-of-elves/level_7"
// ORCS
import { orcsLvl1 } from "./orc-tribes/level_1"
import { orcsLvl2 } from "./orc-tribes/level_2"
import { orcsLvl3 } from "./orc-tribes/level_3"
import { orcsLvl4 } from "./orc-tribes/level_4"
import { orcsLvl5 } from "./orc-tribes/level_5"
import { orcsLvl6 } from "./orc-tribes/level_6"
import { orcsLvl7 } from "./orc-tribes/level_7"
// DAMNED
import { damnedLvl1 } from "./damned-hordes/level_1"
import { damnedLvl2 } from "./damned-hordes/level_2"
import { damnedLvl3 } from "./damned-hordes/level_3"
import { damnedLvl4 } from "./damned-hordes/level_4"
import { damnedLvl5 } from "./damned-hordes/level_5"
import { damnedLvl6 } from "./damned-hordes/level_6"
import { damnedLvl7 } from "./damned-hordes/level_7"

export const skillModules = {
    ["houses-of-elves"]: {
        1: elvesLvl1,
        2: elvesLvl2,
        3: elvesLvl3,
        4: elvesLvl4,
        5: elvesLvl5,
        6: elvesLvl6,
        7: elvesLvl7
    },
    ["orc-tribes"]: {
        1: orcsLvl1,
        2: orcsLvl2,
        3: orcsLvl3,
        4: orcsLvl4,
        5: orcsLvl5,
        6: orcsLvl6,
        7: orcsLvl7
    },
    ["damned-hordes"]: {
        1: damnedLvl1,
        2: damnedLvl2,
        3: damnedLvl3,
        4: damnedLvl4,
        5: damnedLvl5,
        6: damnedLvl6,
        7: damnedLvl7
    },

}