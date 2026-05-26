from withoutbg import WithoutBG

img = WithoutBG.opensource()
result = img.remove_background("cex.jpeg")
result.save("cexsinfondo.png")

print("✓ Imagen procesada correctamente!")
print("✓ Archivo guardado como: cexsinfondo.png")


