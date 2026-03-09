from withoutbg import WithoutBG

img = WithoutBG.opensource()
result = img.remove_background("imgprueba.png")
result.save("output_imgprueba.png")

print("✓ Imagen procesada correctamente!")
print("✓ Archivo guardado como: output_imgprueba.png")