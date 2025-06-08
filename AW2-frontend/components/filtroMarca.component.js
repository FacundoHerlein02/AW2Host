const marcas =[['Honda','../../resource/img/Honda-Logo.webp'],
['BMW','../../resource/img/bmw-logo.webp'],
['Kawasaki','../../resource/img/kawasaki-logo.webp'],
['Motomel','../../resource/img/motomel-logo.webp'],
['Corven','../../resource/img/corven-logo.webp']];
export const filtro= marcas.map(([marca,ruta])=>`
            <div class="bg-slate-100 w-20 h-20 rounded-md aspect-video cursor-pointer" data-marca="${marca}">
                <img class="w-full h-full object-contain"src="${ruta}" alt="${marca}">
            </div>
`).join('');