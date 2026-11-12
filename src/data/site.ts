import { asset } from '../lib/asset';

export type Side = 'up' | 'down' | 'left' | 'right';
export type Kind = 'image' | 'video';

export interface Piece {
  id: string;
  kind: Kind;
  src: string;
  poster?: string;
  alt: string;
  caption: string;
}

export const artist = {
  name: 'Daisy Monsalve',
  mark: 'Daisy',
  role: 'Black work, ornamental e ilustrativo',
};

export const whatsappUsername = 'daisy__monsalve';

export const links = {
  agenda: '#agenda',
  instagram: 'https://www.instagram.com/daisy__monsalve/',
  tiktok: 'https://www.instagram.com/daisy__monsalve/',
  whatsapp: `https://wa.me/@${whatsappUsername}`,
  gallery: '#trabajo',
  styles: '#estilos',
  about: '#daisy',
  process: '#proceso',
  reviews: '#resenas',
};

export const styleOptions = ['Black Work', 'Ornamental', 'Ilustrativo'];

export function whatsAppBookingUrl(name: string, style: string, message: string) {
  const text = [
    `Hola Daisy, soy ${name.trim()}.`,
    `Me interesa un tatuaje en estilo ${style}.`,
    '',
    message.trim(),
  ].join('\n');
  const params = new URLSearchParams({
    text,
    username: whatsappUsername,
    type: 'username',
    app_absent: '0',
  });
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}

export const nav = [
  {
    label: 'Trabajo',
    href: links.gallery,
    children: [
      { label: 'Galería', href: links.gallery },
      { label: 'Estilos', href: links.styles },
    ],
  },
  { label: 'Proceso', href: links.process },
  {
    label: 'Daisy',
    href: links.about,
    children: [
      { label: 'Sobre mí', href: links.about },
      { label: 'Reseñas', href: links.reviews },
    ],
  },
];

export const catalog: Piece[] = [
  {
    id: 'manga-cuernos',
    kind: 'video',
    src: asset('/media/video/manga-cuernos-video.mp4'),
    poster: asset('/media/photo/manga-cuernos.webp'),
    alt: 'Manga en black work con un rostro, cuernos y un dragón',
    caption: 'Manga. Rostro, cuerno y dragón.',
  },
  {
    id: 'mano-demonio',
    kind: 'image',
    src: asset('/media/photo/mano-demonio.webp'),
    alt: 'Mano en negro con un rostro entre franjas',
    caption: 'Mano. Línea y negro sólido.',
  },
  {
    id: 'antebrazo-lobo',
    kind: 'video',
    src: asset('/media/video/antebrazo-lobo.mp4'),
    poster: asset('/media/photo/still-antebrazo-lobo.webp'),
    alt: 'Antebrazo con un lobo entre llamas negras',
    caption: 'Antebrazo. Lobo en negro.',
  },
  {
    id: 'espalda-rostro',
    kind: 'image',
    src: asset('/media/photo/espalda-rostro.webp'),
    alt: 'Espalda con un rostro ilustrado entre flores y ornamento',
    caption: 'Espalda. Ilustración y ornamento.',
  },
  {
    id: 'muslo-reina',
    kind: 'video',
    src: asset('/media/video/muslo-reina-video.mp4'),
    poster: asset('/media/photo/muslo-reina.webp'),
    alt: 'Muslo con una figura de ojos rojos y costillas',
    caption: 'Muslo. Figura de gran formato.',
  },
  {
    id: 'pecho-dragon',
    kind: 'image',
    src: asset('/media/photo/pecho-dragon.webp'),
    alt: 'Pecho con un dragón ornamental en negro',
    caption: 'Pecho. Dragón ornamental.',
  },
  {
    id: 'cuello-pantera',
    kind: 'video',
    src: asset('/media/video/cuello-video.mp4'),
    poster: asset('/media/photo/cuello-pantera.webp'),
    alt: 'Cuello y pecho con una pantera, flores y líneas ornamentales',
    caption: 'Cuello. Pantera y flor.',
  },
  {
    id: 'pierna-criatura',
    kind: 'image',
    src: asset('/media/photo/pierna-criatura.webp'),
    alt: 'Pierna en black work con una criatura y costillas',
    caption: 'Pierna. Black work de gran formato.',
  },
  {
    id: 'manga-serpientes',
    kind: 'image',
    src: asset('/media/photo/manga-serpientes.webp'),
    alt: 'Manga de serpientes entrelazadas en negro',
    caption: 'Manga. Serpientes.',
  },
  {
    id: 'nuca-calavera',
    kind: 'video',
    src: asset('/media/video/nuca-calavera.mp4'),
    poster: asset('/media/photo/still-nuca-calavera.webp'),
    alt: 'Nuca con una calavera ornamental',
    caption: 'Nuca. Calavera ornamental.',
  },
  {
    id: 'brazo-craneo',
    kind: 'video',
    src: asset('/media/video/brazo-craneo.mp4'),
    poster: asset('/media/photo/still-brazo-craneo.webp'),
    alt: 'Brazo con un cráneo envuelto en formas negras',
    caption: 'Brazo. Cráneo.',
  },
  {
    id: 'espalda-detalle',
    kind: 'image',
    src: asset('/media/photo/espalda-detalle.webp'),
    alt: 'Detalle de una espalda ilustrada en negro y gris',
    caption: 'Detalle de espalda.',
  },
  {
    id: 'muslo-ave',
    kind: 'video',
    src: asset('/media/video/muslo-ave.mp4'),
    poster: asset('/media/photo/still-muslo-ave.webp'),
    alt: 'Muslo con un ave ornamental',
    caption: 'Muslo. Ave.',
  },
  {
    id: 'manga-rostros',
    kind: 'video',
    src: asset('/media/video/manga-rostros.mp4'),
    poster: asset('/media/photo/still-manga-rostros.webp'),
    alt: 'Manga con rostros y serpientes',
    caption: 'Manga. Rostros.',
  },
  {
    id: 'brazo-sombra',
    kind: 'video',
    src: asset('/media/video/brazo-sombra.mp4'),
    poster: asset('/media/photo/still-brazo-sombra.webp'),
    alt: 'Brazo con una figura oscura de línea fina',
    caption: 'Brazo. Figura en sombra.',
  },
  {
    id: 'antebrazo-llama',
    kind: 'video',
    src: asset('/media/video/antebrazo-llama.mp4'),
    poster: asset('/media/photo/still-antebrazo-llama.webp'),
    alt: 'Antebrazo con un animal entre llamas negras',
    caption: 'Antebrazo. Llama negra.',
  },
  {
    id: 'manga-gargola',
    kind: 'video',
    src: asset('/media/video/manga-gargola.mp4'),
    poster: asset('/media/photo/still-manga-gargola.webp'),
    alt: 'Manga con una gárgola y ornamento',
    caption: 'Manga. Gárgola.',
  },
  {
    id: 'cuello-ornamental',
    kind: 'video',
    src: asset('/media/video/cuello-ornamental.mp4'),
    poster: asset('/media/photo/still-cuello-ornamental.webp'),
    alt: 'Cuello cubierto de líneas ornamentales',
    caption: 'Cuello. Ornamento.',
  },
  {
    id: 'antebrazo-esqueleto',
    kind: 'video',
    src: asset('/media/video/antebrazo-esqueleto.mp4'),
    poster: asset('/media/photo/still-antebrazo-esqueleto.webp'),
    alt: 'Antebrazo con un esqueleto de ave',
    caption: 'Antebrazo. Esqueleto.',
  },
  {
    id: 'hombro-organico',
    kind: 'video',
    src: asset('/media/video/hombro-organico.mp4'),
    poster: asset('/media/photo/still-hombro-organico.webp'),
    alt: 'Hombro y brazo con formas orgánicas en negro',
    caption: 'Hombro. Formas orgánicas.',
  },
  {
    id: 'pierna-detalle',
    kind: 'image',
    src: asset('/media/photo/pierna-detalle.webp'),
    alt: 'Detalle de una pierna en black work sobre la camilla',
    caption: 'Pierna, recién terminada.',
  },
  {
    id: 'sesion-daisy',
    kind: 'image',
    src: asset('/media/photo/sesion-daisy.webp'),
    alt: 'Sesión de tatuaje en proceso sobre un brazo',
    caption: 'En sesión.',
  },
  {
    id: 'sesion-duo',
    kind: 'image',
    src: asset('/media/photo/sesion-duo.webp'),
    alt: 'Dos personas tatuando una pieza en negro y rojo',
    caption: 'Sesión a cuatro manos.',
  },
  {
    id: 'sesion-estudio',
    kind: 'video',
    src: asset('/media/video/sesion-estudio.mp4'),
    poster: asset('/media/photo/still-sesion-estudio.webp'),
    alt: 'Detalle de una máquina trabajando la piel',
    caption: 'La máquina sobre la piel.',
  },
];

export function pick(ids: string[]): Piece[] {
  return ids.map((id) => {
    const piece = catalog.find((item) => item.id === id);
    if (!piece) throw new Error(`Pieza desconocida: ${id}`);
    return piece;
  });
}

export const collage = [
  { ...pick(['manga-cuernos'])[0], slot: 'slot-a', from: 'up' as Side },
  { ...pick(['mano-demonio'])[0], slot: 'slot-b', from: 'left' as Side },
  { ...pick(['antebrazo-lobo'])[0], slot: 'slot-c', from: 'down' as Side },
  { ...pick(['espalda-rostro'])[0], slot: 'slot-d', from: 'left' as Side },
  { ...pick(['muslo-reina'])[0], slot: 'slot-e', from: 'down' as Side },
  { ...pick(['pecho-dragon'])[0], slot: 'slot-f', from: 'right' as Side },
  { ...pick(['cuello-pantera'])[0], slot: 'slot-g', from: 'right' as Side },
];

export const reelDown = pick([
  'pierna-criatura',
  'manga-serpientes',
  'nuca-calavera',
  'brazo-craneo',
  'espalda-detalle',
  'pierna-detalle',
]);

export const reelUp = pick([
  'muslo-ave',
  'manga-rostros',
  'brazo-sombra',
  'antebrazo-llama',
  'manga-gargola',
  'hombro-organico',
]);

export const instagram = pick([
  'sesion-daisy',
  'mano-demonio',
  'sesion-estudio',
  'cuello-ornamental',
  'pecho-dragon',
  'antebrazo-esqueleto',
  'sesion-duo',
  'manga-gargola',
]);

export const styles = [
  {
    id: 'black-work',
    title: 'Black Work',
    image: asset('/media/photo/muslo-reina.webp'),
    alt: 'Muslo en black work, figura de gran formato',
    text: 'Negros sólidos, contraste y textura. La pieza se asienta en la piel sin perder el dibujo.',
  },
  {
    id: 'ornamental',
    title: 'Ornamental',
    image: asset('/media/photo/cuello-pantera.webp'),
    alt: 'Cuello ornamental con pantera, flores y línea limpia',
    text: 'Líneas limpias y detalle que envuelve la anatomía, con equilibrio de un extremo al otro.',
  },
  {
    id: 'ilustrativo',
    title: 'Ilustrativo',
    image: asset('/media/photo/espalda-rostro.webp'),
    alt: 'Espalda ilustrativa con un rostro y ornamento',
    text: 'Figuras con identidad, fusionadas con el ornamento para que la pieza no se parezca a otra.',
  },
];

export const aboutPoints = [
  {
    title: 'Black work',
    text: 'Trabajo el negro ornamental e ilustrativo con una estética oscura, elegante y una intención artística muy definida.',
    href: '#estilos',
    link: 'Ver los estilos',
  },
  {
    title: 'Sobre la piel',
    text: 'Me interesan el contraste, la línea limpia y la textura cuando se adaptan a cada cuerpo. El equilibrio importa tanto como el motivo.',
    href: '#trabajo',
    link: 'Ver las piezas',
  },
  {
    title: 'Formato',
    text: 'También exploro el blackout, la línea fina y los trabajos grandes. La ejecución se mantiene limpia y la composición, estructurada.',
    href: '#proceso',
    link: 'Ver el proceso',
  },
];

export const steps = [
  {
    n: '1',
    title: 'La conversación',
    text: 'Hablamos de la zona, las referencias y lo que quieres que se sienta. Ahí empieza la pieza.',
    textFirst: true,
  },
  {
    n: '2',
    title: 'La composición',
    text: 'Dibujo sobre la anatomía: contraste, línea y un equilibrio que se sostenga con el cuerpo.',
    textFirst: false,
  },
  {
    n: '3',
    title: 'La sesión',
    text: 'Negros sólidos y líneas precisas. El tiempo que haga falta para una ejecución limpia.',
    textFirst: true,
  },
  {
    n: '4',
    title: 'El cuidado',
    text: 'Te dejo indicaciones claras para que cicatrice bien y el negro se quede donde tiene que estar.',
    textFirst: false,
  },
];

export const reviews = [
  {
    name: 'Valentina',
    text: 'Llegué con una idea suelta y salí con una pieza que sigue el brazo como si siempre hubiera estado ahí. El negro cicatrizó parejo.',
  },
  {
    name: 'Mateo',
    text: 'Se nota el cuidado con la composición. Nada está de más. La sesión fue tranquila y el resultado, muy limpio.',
  },
  {
    name: 'Lucía',
    text: 'Quería algo ornamental sin que se viera genérico. Daisy mezcló la flor con la línea del cuello y quedó con identidad propia.',
  },
  {
    name: 'Andrés',
    text: 'Es la segunda pieza con ella. El formato grande daba miedo y lo resolvió por partes, sin perder el dibujo completo.',
  },
  {
    name: 'Renata',
    text: 'Me explicó el cuidado sin apuro. Meses después el contraste sigue firme y la línea no se abrió.',
  },
];

export const footer = {
  line: 'Cuando quieras, agenda tu cita.',
  credit: 'Diseñado y desarrollado por',
  studio: 'OwlcyLabs',
  studioUrl: 'https://owlcy.com',
  rights: 'Todos los derechos reservados',
  year: '2026',
};
