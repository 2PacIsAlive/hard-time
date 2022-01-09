// export default `┌─────────────────────────────────────────────────────────┐
// │                          *   *                         *│
// │ ┌──────────────┐  ┌───────────────────────────────────┐ │
// │ │              │  │                                   │ │
// │ │  ┌─────────┐ │* │  ┌────────────┐       ┌───────────┘ │
// │ │  │P *  * * └─┘  │  │            └───────┘             │
// │ │  │ *┌───┐ *   * │  │* ┌──────┐   *   *  *  ┌───────┐  │
// │ │  └──┘   └───────┘  └──┘      └─────────────┘       │* │
// │ │                                                    │  │
// │ │      ┌───────────────────────────────────────────┐ │  │
// │ │      │                        C                  │ │  │
// │ └───┐  │ ┌─────────────────────┐  ┌───────────┐    │ │  │
// │     │  │ │*                    │  │           │    │ │ *│
// │ ┌───┘  │ └─────────────┐  ┌─┐  │  │ ┌─┐       │    │ │  │
// │ │      │     *    *  * │  │ │  │  │ │ │       │    │ │  │
// │ └──────┘       ┌────┐ *│ *│ │  │  │ │ │ ┌─┐   │    │ │  │
// │           *    │    │* │  │ │  │  │ │ │ │ └───┘    │ │  │
// │ ┌──────────────┘    └──┘  │ │  │  │ │ │ │          │ │* │
// │ │                         │ │  │  │ │ │ └──────────┘ │  │
// │ │  ┌────┐ ┌───────────────┘ │@ │  │ │ │              │  │
// │ │  │    │ │                 └──┘  │ │ └───────────┐  │  │
// │ │  │    │*│                       │ │             │  │  │
// │ │  │    │ └───────────────────────┘ └─────────┐   │  │ *│
// │ │  │    │            *                        │   │  │  │
// │ │  │    └────────────────────┐  ┌─────────────┘   │  │  │
// │ │  │     *                   │  │                 │  │  │
// │ │  └─────────┐  ┌────────────┘  └──────┐  ┌───────┘  │  │
// │ │            │  │p        *          * │  │          │* │
// │ └────────────┘  └──────────────────────┘  └──────────┘  │
// │        *                                                │
// └─────────────────────────────────────────────────────────┘`
// export default {
//   current: `┌────┬───────┬────┬──────┐
// │    │       │p   │      │
// │ │  │   ─┐  └─┐ ?│   @│ │
// │ │ ┌┘    │    └──┤  ──┘ │
// │C│ │  ┌─ └─┐     ├─     │
// ├─┘ │  │    │ ┌─┐ │  ─┬─ │
// │   │ ┌┴─ ┌─┘ │ │ └┐  │  │
// │ │ │ │P  │   │ │  │ ─┴─ │
// │ └─┘ └───┴───┘ │ ─┘     │
// │               │        │
// └───────────────┴────────┘`,
//   default: `┌────┬───────┬────┬──────┐
// │    │       │p   │      │
// │ │  │   ─┐  └─┐ ?│   @│ │
// │ │ ┌┘    │    └──┤  ──┘ │
// │C│ │  ┌─ └─┐     ├─     │
// ├─┘ │  │    │ ┌─┐ │  ─┬─ │
// │   │ ┌┴─ ┌─┘ │ │ └┐  │  │
// │ │ │ │P  │   │ │  │ ─┴─ │
// │ └─┘ └───┴───┘ │ ─┘     │
// │               │        │
// └───────────────┴────────┘`,
//   aiSpeed: 20,
// }
import { intro } from '../lore'

export default {
  current: `┌───────────────────────────┬─────────────────────┐
│                           │                     │
│  ┌───────────────┐  ┌──┐  └────────┐  ┌──────┐  │
│  │               │  │  │           │  │      │  │
│  ├───────────────┘  │  │  ┌────────┘  └──────┘  │
│  │                  │  └──┘                     │
│  │  ────────────────┘         ┌──┐  ┌──┐  ┌──┐  │
│  │                            │  │  │  │  │  │  │
│  ├───────────┬────────────────┘  │  │  │  │  │  │
│  │           │                   │  │  └──┘  │  │
│     ┌────┐   │  ┌──────┬──────┐  │  │        │  │
├─────┘    │   │  │    @ │ C    │  │  │   ┌────┘  │
│          │   │  │  ┌───┴───┐  │  │  │   │       │
│   ┌──────┘   │  │  │       │  │  │  │   └────┐  │
│   │P         │  │  │  ┌────┘  └──┘  │        │  │
│   └──────────┘  │  │  │             │   ┌────┘  │
│                 │  │  │  ┌─────┐  ┌─┘   │?      │
│   ┌─────────────┘  │  └──┘     └──┘     └───────┤
│   │                │        │                   │
│   │   ──────────┐  │  ──────┴────────────────┐  │
│   │            !│  │                        p│  │
│   └─────────────┘  └─────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘`,
  default: `┌───────────────────────────┬─────────────────────┐
│                           │                     │
│  ┌───────────────┐  ┌──┐  └────────┐  ┌──────┐  │
│  │               │  │  │           │  │      │  │
│  ├───────────────┘  │  │  ┌────────┘  └──────┘  │
│  │                  │  └──┘                     │
│  │  ────────────────┘         ┌──┐  ┌──┐  ┌──┐  │
│  │                            │  │  │  │  │  │  │
│  ├───────────┬────────────────┘  │  │  │  │  │  │
│  │           │                   │  │  └──┘  │  │
│     ┌────┐   │  ┌──────┬──────┐  │  │        │  │
├─────┘    │   │  │    @ │ C    │  │  │   ┌────┘  │
│          │   │  │  ┌───┴───┐  │  │  │   │       │
│   ┌──────┘   │  │  │       │  │  │  │   └────┐  │
│   │P         │  │  │  ┌────┘  └──┘  │        │  │
│   └──────────┘  │  │  │             │   ┌────┘  │
│                 │  │  │  ┌─────┐  ┌─┘   │?      │
│   ┌─────────────┘  │  └──┘     └──┘     └───────┤
│   │                │        │                   │
│   │   ──────────┐  │  ──────┴────────────────┐  │
│   │            !│  │                        p│  │
│   └─────────────┘  └─────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘`,
  aiSpeed: 60,
  lore: intro,
}