interface Coordinates {
  x: number;
  y: number;
}

interface Icon {
  src: string; // URL or path to SVG
  alt: string;
}

interface Fortification {
  name: string;
  durability: number;
  effects: string[];
  lastRepaired: Date;
}

interface LootItem {
  name: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  dropRate: number; // 0.0 to 1.0
}

interface LootTable {
  items: LootItem[];
}

interface Skill {
  name: string;
  level: number;
  effects: string[];
}

interface Player {
  id: string;
  name: string;
  avatarUrl: string;
  stats: PlayerStats;
  inventory: LootItem[];
  skills: Skill[];
  position: Coordinates;
  health: number;
  energy: number;
}

interface PlayerStats {
  strength: number;
  agility: number;
  intelligence: number;
  endurance: number;
}

interface Cell {
  name: string;
  icon: Icon;
  players: Player[];
  lootTable: LootTable;
  lastLooted: Date;
  fortifications: Fortification[];
  description: string;
  coordinates: Coordinates;
  tags: string[]; // e.g., ["residential", "burned", "safe"]
  searchable: boolean;
  dangerous: boolean;
}

function CellComponent({ cell }: { cell: Cell }) {
  return (
    <div className='relative bg-zinc-900 border border-zinc-700 p-2 h-32 w-32 flex flex-col justify-between hover:bg-zinc-800 transition-colors'>
      <div className='flex justify-between items-start'>
        <img src={cell.icon.src} alt={cell.icon.alt} className='h-6 w-6' />
        <span className='text-xs text-white font-bold'>{cell.name}</span>
      </div>
      <div className='text-xs text-zinc-400'>
        {cell.description.slice(0, 40)}
      </div>
      <div className='flex justify-between items-end'>
        <span className='text-xs text-green-400'>
          Loot: {cell.lootTable.items.length}
        </span>
        <span className='text-xs text-blue-300'>
          Players: {cell.players.length}
        </span>
      </div>
    </div>
  );
}

function Grid({ cells }: { cells: Cell[] }) {
  return (
    <div className='grid grid-cols-3 gap-1 w-fit'>
      {cells.map((cell, i) => (
        <CellComponent key={i} cell={cell} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const dummyCell: Cell = {
    name: "John's Jewelry",
    icon: { src: "/icons/jewelry.svg", alt: "Jewelry" },
    players: [],
    lootTable: {
      items: [
        { name: "Gold Ring", rarity: "rare", dropRate: 0.2 },
        { name: "Silver Watch", rarity: "uncommon", dropRate: 0.4 },
      ],
    },
    lastLooted: new Date(),
    fortifications: [
      {
        name: "Steel Bars",
        durability: 80,
        effects: ["block entry"],
        lastRepaired: new Date(),
      },
    ],
    description: "A small, looted jewelry store downtown.",
    coordinates: { x: 0, y: 0 },
    tags: ["commercial"],
    searchable: true,
    dangerous: false,
  };

  const gridCells = Array.from({ length: 9 }, (_, i) => ({
    ...dummyCell,
    name: `Block ${i + 1}`,
    coordinates: { x: i % 3, y: Math.floor(i / 3) },
  }));

  return (
    <div className='min-h-screen flex items-center justify-center bg-black'>
      <Grid cells={gridCells} />
    </div>
  );
}
