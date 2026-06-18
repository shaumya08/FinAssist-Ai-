import { useState } from "react";
import { governmentSchemes, GovernmentScheme } from "@/data/governmentSchemes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, ExternalLink, Search, ChevronDown, ChevronUp, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const categoryColors: Record<string, string> = {
  savings: "bg-primary/10 text-primary border-primary/20",
  loan: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  pension: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  housing: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  insurance: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export default function GovernmentSchemes() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("scheme-favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });
  const [filter, setFilter] = useState<string>("all");

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast.info("Removed from favorites"); }
      else { next.add(id); toast.success("Added to favorites"); }
      localStorage.setItem("scheme-favorites", JSON.stringify([...next]));
      return next;
    });
  };

  const filtered = governmentSchemes.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || filter === "favorites" ? true : s.category === filter;
    const matchFav = filter === "favorites" ? favorites.has(s.id) : true;
    return matchSearch && matchFilter && matchFav;
  });

  const categories = ["all", "favorites", "savings", "loan", "pension", "housing"];

  return (
    <div className="min-h-screen pt-20 px-4 pb-10">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Landmark className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Government Schemes</h1>
          </div>
          <p className="text-sm text-muted-foreground">Explore popular Indian financial schemes and save your favorites.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search schemes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <Button key={c} variant={filter === c ? "default" : "outline"} size="sm" onClick={() => setFilter(c)} className="capitalize text-xs">
                {c === "favorites" ? "⭐ Favorites" : c}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="surface-card p-10 text-center">
            <p className="text-muted-foreground">No schemes found. Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((scheme, i) => (
              <SchemeCard key={scheme.id} scheme={scheme} index={i} expanded={expanded === scheme.id} onToggle={() => setExpanded(expanded === scheme.id ? null : scheme.id)} isFav={favorites.has(scheme.id)} onFav={() => toggleFavorite(scheme.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SchemeCard({ scheme, index, expanded, onToggle, isFav, onFav }: { scheme: GovernmentScheme; index: number; expanded: boolean; onToggle: () => void; isFav: boolean; onFav: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} className="surface-card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xl">{scheme.icon}</span>
              <h3 className="font-semibold text-sm">{scheme.name}</h3>
              <Badge className={categoryColors[scheme.category] || ""}>{scheme.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{scheme.shortDesc}</p>
            {scheme.interestRate && (
              <p className="text-xs font-mono text-primary mt-1">{scheme.interestRate}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onFav}>
              <Heart className={`h-4 w-4 ${isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
              <p className="text-sm text-muted-foreground">{scheme.description}</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Eligibility</h4>
                  <ul className="space-y-1">{scheme.eligibility.map((e, i) => <li key={i} className="text-sm flex items-start gap-2"><span className="text-primary mt-1">•</span>{e}</li>)}</ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Benefits</h4>
                  <ul className="space-y-1">{scheme.benefits.map((b, i) => <li key={i} className="text-sm flex items-start gap-2"><span className="text-primary mt-1">•</span>{b}</li>)}</ul>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={scheme.officialLink} target="_blank" rel="noopener noreferrer">
                  Visit Official Website <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
