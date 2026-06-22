'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export interface MapPin {
  key: string
  label: string
  lng: number
  lat: number
  colorVar: string
}

const SELVA_HOME: [number, number] = [-80.2453, 25.7270]
const CENTER: [number, number]     = [-80.2390, 25.7258]
const DEFAULT_ZOOM = 13.8

export default function MapboxMap({ pins }: { pins: MapPin[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) { console.warn('MapboxMap: NEXT_PUBLIC_MAPBOX_TOKEN not set'); return }

    mapboxgl.accessToken = token

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: CENTER,
      zoom: DEFAULT_ZOOM,
      interactive: false,
      attributionControl: false,
    })
    mapRef.current = map

    map.on('load', () => {
      // Tint water to match SELVA palette
      try { map.setPaintProperty('water', 'fill-color', '#B8D4DF') } catch (_e) { /* */ }

      // SELVA home diamond marker
      const homeEl = document.createElement('div')
      homeEl.className = 'nmap-home'
      homeEl.innerHTML =
        '<span class="nmap-home__glyph"></span>' +
        '<span class="nmap-home__label">SELVA</span>'
      new mapboxgl.Marker({ element: homeEl, anchor: 'center' })
        .setLngLat(SELVA_HOME)
        .addTo(map)

      // POI markers — reuse existing CSS classes, Mapbox handles positioning
      pins.forEach((pin) => {
        const el = document.createElement('div')
        el.className = 'nmap-pin'
        el.setAttribute('data-key', pin.key)
        el.innerHTML =
          `<span class="nmap-pin__dot" style="background:${pin.colorVar}"></span>` +
          `<span class="nmap-pin__label">${pin.label}</span>`
        new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([pin.lng, pin.lat])
          .addTo(map)
      })
    })

    // Events dispatched by NeighborhoodScript on POI hover
    const onFocus = (e: Event) => {
      const { lng, lat, key } = (e as CustomEvent<{ lng: number; lat: number; key: string }>).detail
      map.flyTo({ center: [lng, lat], zoom: 15.5, duration: 900, essential: true })
      document.querySelectorAll<HTMLElement>('.nmap-pin').forEach((el) => {
        el.classList.toggle('is-active', el.getAttribute('data-key') === key)
      })
    }
    const onReset = () => {
      map.flyTo({ center: CENTER, zoom: DEFAULT_ZOOM, duration: 700, essential: true })
      document.querySelectorAll<HTMLElement>('.nmap-pin').forEach((el) => el.classList.remove('is-active'))
    }

    window.addEventListener('selva:map-focus', onFocus)
    window.addEventListener('selva:map-reset', onReset)

    return () => {
      window.removeEventListener('selva:map-focus', onFocus)
      window.removeEventListener('selva:map-reset', onReset)
      map.remove()
      mapRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
