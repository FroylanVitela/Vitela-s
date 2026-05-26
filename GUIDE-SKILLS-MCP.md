# Guía: Skills, MCP y Gentleman-Skills con OpenCode

## 1. INSTALAR Y CONFIGURAR SKILLS

### Opción A:skills.sh (Vercel)
```bash
# Instalar skills desde skills.sh
npx skills add vercel-labs/agent-skills
npx skills add Gentleman-Programming/Gentleman-Skills
```

### Opción B:Skilz CLI (recomendado)
```bash
# Instalar Skilz
pip install skilz

# Instalar skill para OpenCode
skilz install Gentleman-Programming/Gentleman-Skills --agent opencode
skilz install vercel-labs/agent-skills --agent opencode
```

### Opción C:Instalación manual
```bash
# Crear directorio de skills global
mkdir -p ~/.config/opencode/skills

# Clonar Gentleman-Skills
git clone https://github.com/Gentleman-Programming/Gentleman-Skills.git ~/.config/opencode/skills/gentleman-skills
```

---

## 2. CONFIGURAR opencode.json

Crea o edita `~/.config/opencode/opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-20250514",
  "permission": {
    "edit": "ask",
    "bash": "ask"
  },
  "skill": {
    "*": "allow"
  },
  "mcp": {}
}
```

---

## 3. CONFIGURAR MCP SERVERS

### MCP Local (ejemplo: filesystem)
```json
{
  "mcp": {
    "filesystem": {
      "type": "local",
      "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "C:/Proyectos"],
      "enabled": true
    }
  }
}
```

### MCP Remote (ejemplo: Context7)
```json
{
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "Authorization": "Bearer TU_API_KEY"
      },
      "enabled": true
    }
  }
}
```

### MCPs Populares
| MCP | Comando |
|-----|---------|
| Filesystem | `npx -y @modelcontextprotocol/server-filesystem /ruta` |
| GitHub | `npx -y @modelcontextprotocol/server-github` |
| Puppeteer | `npx -y @modelcontextprotocol/server-puppeteer |
| Brave Search | `npx -y @modelcontextprotocol/server-brave-search` |

---

## 4. USAR SKILLS EN OPENCODE

### Activar un skill
```
Usa el skill "gentleman-angular" para crear un componente
```

### Buscar skills disponibles
```
Lista todos los skills disponibles
```

### Estructura de un SKILL.md
```markdown
---
name: mi-skill
description: Descripción del skill
license: MIT
---

# Contenido del skill
 instrucciones detalladas...
```

---

## 5. COMANDOS ÚTILES

```bash
# Listar MCPs configurados
opencode mcp list

# Añadir MCP interactivamente
opencode mcp add

# Verificar conexión MCP
opencode mcp debug nombre-mcp

# Actualizar OpenCode
opencode --update
```

---

## 6. RECURSOS

- **Skills**: https://skills.sh
- **Gentleman-Skills**: https://github.com/Gentleman-Programming/Gentleman-Skills
- **MCP Docs**: https://modelcontextprotocol.io/docs/getting-started/intro
- **OpenCode Docs**: https://opencode.ai/docs/skills/