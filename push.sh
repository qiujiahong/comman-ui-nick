
git add .
git commit -m $1
cat src/index_com.tsx > src/index.tsx
git push origin 
git push hub 